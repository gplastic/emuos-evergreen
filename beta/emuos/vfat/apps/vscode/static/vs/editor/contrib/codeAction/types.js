/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/common/strings"], function (require, exports, strings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CodeActionKind {
        constructor(value) {
            this.value = value;
        }
        equals(other) {
            return this.value === other.value;
        }
        contains(other) {
            return this.equals(other) || this.value === '' || strings_1.startsWith(other.value, this.value + CodeActionKind.sep);
        }
        intersects(other) {
            return this.contains(other) || other.contains(this);
        }
        append(part) {
            return new CodeActionKind(this.value + CodeActionKind.sep + part);
        }
    }
    exports.CodeActionKind = CodeActionKind;
    CodeActionKind.sep = '.';
    CodeActionKind.None = new CodeActionKind('@@none@@'); // Special code action that contains nothing
    CodeActionKind.Empty = new CodeActionKind('');
    CodeActionKind.QuickFix = new CodeActionKind('quickfix');
    CodeActionKind.Refactor = new CodeActionKind('refactor');
    CodeActionKind.Source = new CodeActionKind('source');
    CodeActionKind.SourceOrganizeImports = CodeActionKind.Source.append('organizeImports');
    CodeActionKind.SourceFixAll = CodeActionKind.Source.append('fixAll');
    var CodeActionAutoApply;
    (function (CodeActionAutoApply) {
        CodeActionAutoApply["IfSingle"] = "ifSingle";
        CodeActionAutoApply["First"] = "first";
        CodeActionAutoApply["Never"] = "never";
    })(CodeActionAutoApply = exports.CodeActionAutoApply || (exports.CodeActionAutoApply = {}));
    function mayIncludeActionsOfKind(filter, providedKind) {
        // A provided kind may be a subset or superset of our filtered kind.
        if (filter.kind && !filter.kind.intersects(providedKind)) {
            return false;
        }
        // Don't return source actions unless they are explicitly requested
        if (CodeActionKind.Source.contains(providedKind) && !filter.includeSourceActions) {
            return false;
        }
        return true;
    }
    exports.mayIncludeActionsOfKind = mayIncludeActionsOfKind;
    function filtersAction(filter, action) {
        const actionKind = action.kind ? new CodeActionKind(action.kind) : undefined;
        // Filter out actions by kind
        if (filter.kind) {
            if (!actionKind || !filter.kind.contains(actionKind)) {
                return false;
            }
        }
        // Don't return source actions unless they are explicitly requested
        if (!filter.includeSourceActions) {
            if (actionKind && CodeActionKind.Source.contains(actionKind)) {
                return false;
            }
        }
        if (filter.onlyIncludePreferredActions) {
            if (!action.isPreferred) {
                return false;
            }
        }
        return true;
    }
    exports.filtersAction = filtersAction;
    class CodeActionCommandArgs {
        constructor(kind, apply, preferred) {
            this.kind = kind;
            this.apply = apply;
            this.preferred = preferred;
        }
        static fromUser(arg, defaults) {
            if (!arg || typeof arg !== 'object') {
                return new CodeActionCommandArgs(defaults.kind, defaults.apply, false);
            }
            return new CodeActionCommandArgs(CodeActionCommandArgs.getKindFromUser(arg, defaults.kind), CodeActionCommandArgs.getApplyFromUser(arg, defaults.apply), CodeActionCommandArgs.getPreferredUser(arg));
        }
        static getApplyFromUser(arg, defaultAutoApply) {
            switch (typeof arg.apply === 'string' ? arg.apply.toLowerCase() : '') {
                case 'first': return "first" /* First */;
                case 'never': return "never" /* Never */;
                case 'ifsingle': return "ifSingle" /* IfSingle */;
                default: return defaultAutoApply;
            }
        }
        static getKindFromUser(arg, defaultKind) {
            return typeof arg.kind === 'string'
                ? new CodeActionKind(arg.kind)
                : defaultKind;
        }
        static getPreferredUser(arg) {
            return typeof arg.preferred === 'boolean'
                ? arg.preferred
                : false;
        }
    }
    exports.CodeActionCommandArgs = CodeActionCommandArgs;
});
//# sourceMappingURL=types.js.map