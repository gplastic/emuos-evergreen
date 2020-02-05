/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/base/common/path", "vs/base/common/strings", "vs/base/common/uri", "vs/platform/remote/common/remoteHosts", "vs/workbench/contrib/webview/common/mimeTypes"], function (require, exports, path_1, strings_1, uri_1, remoteHosts_1, mimeTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebviewResourceScheme = 'vscode-resource';
    var WebviewResourceResponse;
    (function (WebviewResourceResponse) {
        let Type;
        (function (Type) {
            Type[Type["Success"] = 0] = "Success";
            Type[Type["Failed"] = 1] = "Failed";
            Type[Type["AccessDenied"] = 2] = "AccessDenied";
        })(Type = WebviewResourceResponse.Type || (WebviewResourceResponse.Type = {}));
        class Success {
            constructor(data, mimeType) {
                this.data = data;
                this.mimeType = mimeType;
                this.type = Type.Success;
            }
        }
        WebviewResourceResponse.Success = Success;
        WebviewResourceResponse.Failed = { type: Type.Failed };
        WebviewResourceResponse.AccessDenied = { type: Type.AccessDenied };
    })(WebviewResourceResponse = exports.WebviewResourceResponse || (exports.WebviewResourceResponse = {}));
    async function resolveContent(fileService, resource, mime) {
        try {
            const contents = await fileService.readFile(resource);
            return new WebviewResourceResponse.Success(contents.value, mime);
        }
        catch (err) {
            console.log(err);
            return WebviewResourceResponse.Failed;
        }
    }
    async function loadLocalResource(requestUri, fileService, extensionLocation, getRoots) {
        const normalizedPath = normalizeRequestPath(requestUri);
        for (const root of getRoots()) {
            if (!containsResource(root, normalizedPath)) {
                continue;
            }
            if (extensionLocation && extensionLocation.scheme === remoteHosts_1.REMOTE_HOST_SCHEME) {
                const redirectedUri = uri_1.URI.from({
                    scheme: remoteHosts_1.REMOTE_HOST_SCHEME,
                    authority: extensionLocation.authority,
                    path: '/vscode-resource',
                    query: JSON.stringify({
                        requestResourcePath: normalizedPath.path
                    })
                });
                return resolveContent(fileService, redirectedUri, mimeTypes_1.getWebviewContentMimeType(requestUri));
            }
            else {
                return resolveContent(fileService, normalizedPath, mimeTypes_1.getWebviewContentMimeType(normalizedPath));
            }
        }
        return WebviewResourceResponse.AccessDenied;
    }
    exports.loadLocalResource = loadLocalResource;
    function normalizeRequestPath(requestUri) {
        if (requestUri.scheme !== exports.WebviewResourceScheme) {
            return requestUri;
        }
        // Modern vscode-resources uris put the scheme of the requested resource as the authority
        if (requestUri.authority) {
            return uri_1.URI.parse(requestUri.authority + ':' + requestUri.path);
        }
        // Old style vscode-resource uris lose the scheme of the resource which means they are unable to
        // load a mix of local and remote content properly.
        return requestUri.with({ scheme: 'file' });
    }
    function containsResource(root, resource) {
        const rootPath = root.fsPath + (strings_1.endsWith(root.fsPath, path_1.sep) ? '' : path_1.sep);
        return strings_1.startsWith(resource.fsPath, rootPath);
    }
});
//# sourceMappingURL=resourceLoader.js.map