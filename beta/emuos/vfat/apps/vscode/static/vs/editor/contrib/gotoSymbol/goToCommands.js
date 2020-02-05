/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/browser/ui/aria/aria", "vs/base/common/async", "vs/base/common/keyCodes", "vs/base/common/platform", "vs/editor/browser/editorBrowser", "vs/editor/browser/editorExtensions", "vs/editor/browser/services/codeEditorService", "vs/editor/common/core/position", "vs/editor/common/core/range", "vs/editor/common/editorContextKeys", "vs/editor/common/modes", "vs/editor/contrib/message/messageController", "vs/editor/contrib/peekView/peekView", "vs/editor/contrib/gotoSymbol/peek/referencesController", "vs/editor/contrib/gotoSymbol/referencesModel", "vs/nls", "vs/platform/contextkey/common/contextkey", "vs/platform/notification/common/notification", "vs/platform/progress/common/progress", "./goToSymbol", "vs/platform/commands/common/commands", "vs/editor/browser/core/editorState", "vs/editor/contrib/gotoSymbol/symbolNavigation", "vs/base/browser/browser", "vs/base/common/uri", "vs/platform/instantiation/common/instantiation", "vs/base/common/types"], function (require, exports, aria_1, async_1, keyCodes_1, platform_1, editorBrowser_1, editorExtensions_1, codeEditorService_1, corePosition, range_1, editorContextKeys_1, modes_1, messageController_1, peekView_1, referencesController_1, referencesModel_1, nls, contextkey_1, notification_1, progress_1, goToSymbol_1, commands_1, editorState_1, symbolNavigation_1, browser_1, uri_1, instantiation_1, types_1) {
    "use strict";
    var _a, _b, _c, _d, _e, _f, _g, _h;
    Object.defineProperty(exports, "__esModule", { value: true });
    class SymbolNavigationAction extends editorExtensions_1.EditorAction {
        constructor(configuration, opts) {
            super(opts);
            this._configuration = configuration;
        }
        run(accessor, editor) {
            if (!editor.hasModel()) {
                return Promise.resolve(undefined);
            }
            const notificationService = accessor.get(notification_1.INotificationService);
            const editorService = accessor.get(codeEditorService_1.ICodeEditorService);
            const progressService = accessor.get(progress_1.IEditorProgressService);
            const symbolNavService = accessor.get(symbolNavigation_1.ISymbolNavigationService);
            const model = editor.getModel();
            const pos = editor.getPosition();
            const cts = new editorState_1.EditorStateCancellationTokenSource(editor, 1 /* Value */ | 4 /* Position */);
            const promise = async_1.raceCancellation(this._getLocationModel(model, pos, cts.token), cts.token).then(async (references) => {
                if (!references || cts.token.isCancellationRequested) {
                    return;
                }
                aria_1.alert(references.ariaMessage);
                const referenceCount = references.references.length;
                const altAction = references.referenceAt(model.uri, pos) && editor.getAction(this._getAlternativeCommand());
                if (referenceCount === 0) {
                    // no result -> show message
                    if (!this._configuration.muteMessage) {
                        const info = model.getWordAtPosition(pos);
                        messageController_1.MessageController.get(editor).showMessage(this._getNoResultFoundMessage(info), pos);
                    }
                }
                else if (referenceCount === 1 && altAction) {
                    // already at the only result, run alternative
                    altAction.run();
                }
                else {
                    // normal results handling
                    return this._onResult(editorService, symbolNavService, editor, references);
                }
            }, (err) => {
                // report an error
                notificationService.error(err);
            }).finally(() => {
                cts.dispose();
            });
            progressService.showWhile(promise, 250);
            return promise;
        }
        async _onResult(editorService, symbolNavService, editor, model) {
            const gotoLocation = this._getGoToPreference(editor);
            if (this._configuration.openInPeek || (gotoLocation === 'peek' && model.references.length > 1)) {
                this._openInPeek(editor, model);
            }
            else {
                const next = model.firstReference();
                const targetEditor = await this._openReference(editor, editorService, next, this._configuration.openToSide);
                if (targetEditor && model.references.length > 1 && gotoLocation === 'gotoAndPeek') {
                    this._openInPeek(targetEditor, model);
                }
                else {
                    model.dispose();
                }
                // keep remaining locations around when using
                // 'goto'-mode
                if (gotoLocation === 'goto') {
                    symbolNavService.put(next);
                }
            }
        }
        _openReference(editor, editorService, reference, sideBySide) {
            // range is the target-selection-range when we have one
            // and the the fallback is the 'full' range
            let range = undefined;
            if (modes_1.isLocationLink(reference)) {
                range = reference.targetSelectionRange;
            }
            if (!range) {
                range = reference.range;
            }
            return editorService.openCodeEditor({
                resource: reference.uri,
                options: {
                    selection: range_1.Range.collapseToStart(range),
                    revealInCenterIfOutsideViewport: true
                }
            }, editor, sideBySide);
        }
        _openInPeek(target, model) {
            let controller = referencesController_1.ReferencesController.get(target);
            if (controller && target.hasModel()) {
                controller.toggleWidget(target.getSelection(), async_1.createCancelablePromise(_ => Promise.resolve(model)), this._configuration.openInPeek);
            }
            else {
                model.dispose();
            }
        }
    }
    //#region --- DEFINITION
    class DefinitionAction extends SymbolNavigationAction {
        async _getLocationModel(model, position, token) {
            return new referencesModel_1.ReferencesModel(await goToSymbol_1.getDefinitionsAtPosition(model, position, token));
        }
        _getNoResultFoundMessage(info) {
            return info && info.word
                ? nls.localize('noResultWord', "No definition found for '{0}'", info.word)
                : nls.localize('generic.noResults', "No definition found");
        }
        _getMetaTitle(model) {
            return model.references.length > 1 ? nls.localize('meta.title', " – {0} definitions", model.references.length) : '';
        }
        _getAlternativeCommand() {
            return 'editor.action.goToReferences';
        }
        _getGoToPreference(editor) {
            return editor.getOption(38 /* gotoLocation */).multipleDefinitions;
        }
    }
    exports.DefinitionAction = DefinitionAction;
    const goToDefinitionKb = platform_1.isWeb && !browser_1.isStandalone
        ? 2048 /* CtrlCmd */ | 70 /* F12 */
        : 70 /* F12 */;
    editorExtensions_1.registerEditorAction((_a = class GoToDefinitionAction extends DefinitionAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: false,
                    muteMessage: false
                }, {
                    id: GoToDefinitionAction.id,
                    label: nls.localize('actions.goToDecl.label', "Go to Definition"),
                    alias: 'Go to Definition',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasDefinitionProvider, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: goToDefinitionKb,
                        weight: 100 /* EditorContrib */
                    },
                    menuOpts: {
                        group: 'navigation',
                        order: 1.1
                    },
                    menubarOpts: {
                        menuId: 16 /* MenubarGoMenu */,
                        group: '4_symbol_nav',
                        order: 2,
                        title: nls.localize({ key: 'miGotoDefinition', comment: ['&& denotes a mnemonic'] }, "Go to &&Definition")
                    }
                });
                commands_1.CommandsRegistry.registerCommandAlias('editor.action.goToDeclaration', GoToDefinitionAction.id);
            }
        },
        _a.id = 'editor.action.revealDefinition',
        _a));
    editorExtensions_1.registerEditorAction((_b = class OpenDefinitionToSideAction extends DefinitionAction {
            constructor() {
                super({
                    openToSide: true,
                    openInPeek: false,
                    muteMessage: false
                }, {
                    id: OpenDefinitionToSideAction.id,
                    label: nls.localize('actions.goToDeclToSide.label', "Open Definition to the Side"),
                    alias: 'Open Definition to the Side',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasDefinitionProvider, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: keyCodes_1.KeyChord(2048 /* CtrlCmd */ | 41 /* KEY_K */, goToDefinitionKb),
                        weight: 100 /* EditorContrib */
                    }
                });
                commands_1.CommandsRegistry.registerCommandAlias('editor.action.openDeclarationToTheSide', OpenDefinitionToSideAction.id);
            }
        },
        _b.id = 'editor.action.revealDefinitionAside',
        _b));
    editorExtensions_1.registerEditorAction((_c = class PeekDefinitionAction extends DefinitionAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: true,
                    muteMessage: false
                }, {
                    id: PeekDefinitionAction.id,
                    label: nls.localize('actions.previewDecl.label', "Peek Definition"),
                    alias: 'Peek Definition',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasDefinitionProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: 512 /* Alt */ | 70 /* F12 */,
                        linux: { primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 68 /* F10 */ },
                        weight: 100 /* EditorContrib */
                    }
                });
                commands_1.CommandsRegistry.registerCommandAlias('editor.action.previewDeclaration', PeekDefinitionAction.id);
            }
        },
        _c.id = 'editor.action.peekDefinition',
        _c));
    //#endregion
    //#region --- DECLARATION
    class DeclarationAction extends SymbolNavigationAction {
        async _getLocationModel(model, position, token) {
            return new referencesModel_1.ReferencesModel(await goToSymbol_1.getDeclarationsAtPosition(model, position, token));
        }
        _getNoResultFoundMessage(info) {
            return info && info.word
                ? nls.localize('decl.noResultWord', "No declaration found for '{0}'", info.word)
                : nls.localize('decl.generic.noResults', "No declaration found");
        }
        _getMetaTitle(model) {
            return model.references.length > 1 ? nls.localize('decl.meta.title', " – {0} declarations", model.references.length) : '';
        }
        _getAlternativeCommand() {
            return 'editor.action.goToReferences';
        }
        _getGoToPreference(editor) {
            return editor.getOption(38 /* gotoLocation */).multipleDeclarations;
        }
    }
    editorExtensions_1.registerEditorAction((_d = class GoToDeclarationAction extends DeclarationAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: false,
                    muteMessage: false
                }, {
                    id: GoToDeclarationAction.id,
                    label: nls.localize('actions.goToDeclaration.label', "Go to Declaration"),
                    alias: 'Go to Declaration',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasDeclarationProvider, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    menuOpts: {
                        group: 'navigation',
                        order: 1.3
                    },
                    menubarOpts: {
                        menuId: 16 /* MenubarGoMenu */,
                        group: '4_symbol_nav',
                        order: 3,
                        title: nls.localize({ key: 'miGotoDeclaration', comment: ['&& denotes a mnemonic'] }, "Go to &&Declaration")
                    },
                });
            }
            _getNoResultFoundMessage(info) {
                return info && info.word
                    ? nls.localize('decl.noResultWord', "No declaration found for '{0}'", info.word)
                    : nls.localize('decl.generic.noResults', "No declaration found");
            }
            _getMetaTitle(model) {
                return model.references.length > 1 ? nls.localize('decl.meta.title', " – {0} declarations", model.references.length) : '';
            }
        },
        _d.id = 'editor.action.revealDeclaration',
        _d));
    editorExtensions_1.registerEditorAction(class PeekDeclarationAction extends DeclarationAction {
        constructor() {
            super({
                openToSide: false,
                openInPeek: true,
                muteMessage: false
            }, {
                id: 'editor.action.peekDeclaration',
                label: nls.localize('actions.peekDecl.label', "Peek Declaration"),
                alias: 'Peek Declaration',
                precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasDeclarationProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
            });
        }
    });
    //#endregion
    //#region --- TYPE DEFINITION
    class TypeDefinitionAction extends SymbolNavigationAction {
        async _getLocationModel(model, position, token) {
            return new referencesModel_1.ReferencesModel(await goToSymbol_1.getTypeDefinitionsAtPosition(model, position, token));
        }
        _getNoResultFoundMessage(info) {
            return info && info.word
                ? nls.localize('goToTypeDefinition.noResultWord', "No type definition found for '{0}'", info.word)
                : nls.localize('goToTypeDefinition.generic.noResults', "No type definition found");
        }
        _getMetaTitle(model) {
            return model.references.length > 1 ? nls.localize('meta.typeDefinitions.title', " – {0} type definitions", model.references.length) : '';
        }
        _getAlternativeCommand() {
            return 'editor.action.goToReferences';
        }
        _getGoToPreference(editor) {
            return editor.getOption(38 /* gotoLocation */).multipleTypeDefinitions;
        }
    }
    editorExtensions_1.registerEditorAction((_e = class GoToTypeDefinitionAction extends TypeDefinitionAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: false,
                    muteMessage: false
                }, {
                    id: GoToTypeDefinitionAction.ID,
                    label: nls.localize('actions.goToTypeDefinition.label', "Go to Type Definition"),
                    alias: 'Go to Type Definition',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasTypeDefinitionProvider, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: 0,
                        weight: 100 /* EditorContrib */
                    },
                    menuOpts: {
                        group: 'navigation',
                        order: 1.4
                    },
                    menubarOpts: {
                        menuId: 16 /* MenubarGoMenu */,
                        group: '4_symbol_nav',
                        order: 3,
                        title: nls.localize({ key: 'miGotoTypeDefinition', comment: ['&& denotes a mnemonic'] }, "Go to &&Type Definition")
                    }
                });
            }
        },
        _e.ID = 'editor.action.goToTypeDefinition',
        _e));
    editorExtensions_1.registerEditorAction((_f = class PeekTypeDefinitionAction extends TypeDefinitionAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: true,
                    muteMessage: false
                }, {
                    id: PeekTypeDefinitionAction.ID,
                    label: nls.localize('actions.peekTypeDefinition.label', "Peek Type Definition"),
                    alias: 'Peek Type Definition',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasTypeDefinitionProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated())
                });
            }
        },
        _f.ID = 'editor.action.peekTypeDefinition',
        _f));
    //#endregion
    //#region --- IMPLEMENTATION
    class ImplementationAction extends SymbolNavigationAction {
        async _getLocationModel(model, position, token) {
            return new referencesModel_1.ReferencesModel(await goToSymbol_1.getImplementationsAtPosition(model, position, token));
        }
        _getNoResultFoundMessage(info) {
            return info && info.word
                ? nls.localize('goToImplementation.noResultWord', "No implementation found for '{0}'", info.word)
                : nls.localize('goToImplementation.generic.noResults', "No implementation found");
        }
        _getMetaTitle(model) {
            return model.references.length > 1 ? nls.localize('meta.implementations.title', " – {0} implementations", model.references.length) : '';
        }
        _getAlternativeCommand() {
            return '';
        }
        _getGoToPreference(editor) {
            return editor.getOption(38 /* gotoLocation */).multipleImplemenations;
        }
    }
    editorExtensions_1.registerEditorAction((_g = class GoToImplementationAction extends ImplementationAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: false,
                    muteMessage: false
                }, {
                    id: GoToImplementationAction.ID,
                    label: nls.localize('actions.goToImplementation.label', "Go to Implementations"),
                    alias: 'Go to Implementations',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasImplementationProvider, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: 2048 /* CtrlCmd */ | 70 /* F12 */,
                        weight: 100 /* EditorContrib */
                    },
                    menubarOpts: {
                        menuId: 16 /* MenubarGoMenu */,
                        group: '4_symbol_nav',
                        order: 4,
                        title: nls.localize({ key: 'miGotoImplementation', comment: ['&& denotes a mnemonic'] }, "Go to &&Implementations")
                    },
                    menuOpts: {
                        group: 'navigation',
                        order: 1.45
                    }
                });
            }
        },
        _g.ID = 'editor.action.goToImplementation',
        _g));
    editorExtensions_1.registerEditorAction((_h = class PeekImplementationAction extends ImplementationAction {
            constructor() {
                super({
                    openToSide: false,
                    openInPeek: true,
                    muteMessage: false
                }, {
                    id: PeekImplementationAction.ID,
                    label: nls.localize('actions.peekImplementation.label', "Peek Implementations"),
                    alias: 'Peek Implementations',
                    precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasImplementationProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                    kbOpts: {
                        kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                        primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 70 /* F12 */,
                        weight: 100 /* EditorContrib */
                    }
                });
            }
        },
        _h.ID = 'editor.action.peekImplementation',
        _h));
    //#endregion
    //#region --- REFERENCES
    class ReferencesAction extends SymbolNavigationAction {
        async _getLocationModel(model, position, token) {
            return new referencesModel_1.ReferencesModel(await goToSymbol_1.getReferencesAtPosition(model, position, token));
        }
        _getNoResultFoundMessage(info) {
            return info
                ? nls.localize('references.no', "No references found for '{0}'", info.word)
                : nls.localize('references.noGeneric', "No references found");
        }
        _getMetaTitle(model) {
            return model.references.length > 1
                ? nls.localize('meta.titleReference', " – {0} references", model.references.length)
                : '';
        }
        _getAlternativeCommand() {
            return '';
        }
        _getGoToPreference(editor) {
            return editor.getOption(38 /* gotoLocation */).multipleReferences;
        }
    }
    editorExtensions_1.registerEditorAction(class GoToReferencesAction extends ReferencesAction {
        constructor() {
            super({
                openToSide: false,
                openInPeek: false,
                muteMessage: false
            }, {
                id: 'editor.action.goToReferences',
                label: nls.localize('goToReferences.label', "Go to References"),
                alias: 'Go to References',
                precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasReferenceProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
                kbOpts: {
                    kbExpr: editorContextKeys_1.EditorContextKeys.editorTextFocus,
                    primary: 1024 /* Shift */ | 70 /* F12 */,
                    weight: 100 /* EditorContrib */
                },
                menuOpts: {
                    group: 'navigation',
                    order: 1.45
                },
                menubarOpts: {
                    menuId: 16 /* MenubarGoMenu */,
                    group: '4_symbol_nav',
                    order: 5,
                    title: nls.localize({ key: 'miGotoReference', comment: ['&& denotes a mnemonic'] }, "Go to &&References")
                },
            });
        }
    });
    editorExtensions_1.registerEditorAction(class PeekReferencesAction extends ReferencesAction {
        constructor() {
            super({
                openToSide: false,
                openInPeek: true,
                muteMessage: false
            }, {
                id: 'editor.action.referenceSearch.trigger',
                label: nls.localize('references.action.label', "Peek References"),
                alias: 'Peek References',
                precondition: contextkey_1.ContextKeyExpr.and(editorContextKeys_1.EditorContextKeys.hasReferenceProvider, peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated())
            });
        }
    });
    //#endregion
    //#region --- GENERIC goto symbols command
    class GenericGoToLocationAction extends SymbolNavigationAction {
        constructor(_references, _gotoMultipleBehaviour) {
            super({
                muteMessage: true,
                openInPeek: false,
                openToSide: false
            }, {
                id: 'editor.action.goToLocation',
                label: nls.localize('label.generic', "Go To Any Symbol"),
                alias: 'Go To Any Symbol',
                precondition: contextkey_1.ContextKeyExpr.and(peekView_1.PeekContext.notInPeekEditor, editorContextKeys_1.EditorContextKeys.isInEmbeddedEditor.toNegated()),
            });
            this._references = _references;
            this._gotoMultipleBehaviour = _gotoMultipleBehaviour;
        }
        async _getLocationModel(_model, _position, _token) {
            return new referencesModel_1.ReferencesModel(this._references);
        }
        _getNoResultFoundMessage(info) {
            return info && nls.localize('generic.noResult', "No results for '{0}'", info.word) || '';
        }
        _getGoToPreference(editor) {
            var _a;
            return _a = this._gotoMultipleBehaviour, (_a !== null && _a !== void 0 ? _a : editor.getOption(38 /* gotoLocation */).multipleReferences);
        }
        _getMetaTitle() { return ''; }
        _getAlternativeCommand() { return ''; }
    }
    commands_1.CommandsRegistry.registerCommand({
        id: 'editor.action.goToLocations',
        description: {
            description: 'Go to locations from a position in a file',
            args: [
                { name: 'uri', description: 'The text document in which to start', constraint: uri_1.URI },
                { name: 'position', description: 'The position at which to start', constraint: corePosition.Position.isIPosition },
                { name: 'locations', description: 'An array of locations.', constraint: Array },
                { name: 'multiple', description: 'Define what to do when having multiple results, either `peek`, `gotoAndPeek`, or `goto' },
            ]
        },
        handler: async (accessor, resource, position, references, multiple) => {
            types_1.assertType(uri_1.URI.isUri(resource));
            types_1.assertType(corePosition.Position.isIPosition(position));
            types_1.assertType(Array.isArray(references));
            types_1.assertType(typeof multiple === 'undefined' || typeof multiple === 'string');
            const editorService = accessor.get(codeEditorService_1.ICodeEditorService);
            const editor = await editorService.openCodeEditor({ resource }, editorService.getFocusedCodeEditor());
            if (editorBrowser_1.isCodeEditor(editor)) {
                editor.setPosition(position);
                editor.revealPositionInCenterIfOutsideViewport(position, 0 /* Smooth */);
                return editor.invokeWithinContext(accessor => {
                    const command = new GenericGoToLocationAction(references, multiple);
                    accessor.get(instantiation_1.IInstantiationService).invokeFunction(command.run.bind(command), editor);
                });
            }
        }
    });
    //#endregion
    //#region --- REFERENCE search special commands
    commands_1.CommandsRegistry.registerCommand({
        id: 'editor.action.findReferences',
        handler: (accessor, resource, position) => {
            types_1.assertType(uri_1.URI.isUri(resource));
            types_1.assertType(corePosition.Position.isIPosition(position));
            const codeEditorService = accessor.get(codeEditorService_1.ICodeEditorService);
            return codeEditorService.openCodeEditor({ resource }, codeEditorService.getFocusedCodeEditor()).then(control => {
                if (!editorBrowser_1.isCodeEditor(control) || !control.hasModel()) {
                    return undefined;
                }
                const controller = referencesController_1.ReferencesController.get(control);
                if (!controller) {
                    return undefined;
                }
                const references = async_1.createCancelablePromise(token => goToSymbol_1.getReferencesAtPosition(control.getModel(), corePosition.Position.lift(position), token).then(references => new referencesModel_1.ReferencesModel(references)));
                const range = new range_1.Range(position.lineNumber, position.column, position.lineNumber, position.column);
                return Promise.resolve(controller.toggleWidget(range, references, false));
            });
        }
    });
    // use NEW command
    commands_1.CommandsRegistry.registerCommandAlias('editor.action.showReferences', 'editor.action.goToLocations');
});
//#endregion
//# sourceMappingURL=goToCommands.js.map