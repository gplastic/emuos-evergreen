/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "vs/nls", "vs/base/common/buffer", "vs/platform/files/common/files", "vs/base/common/errors"], function (require, exports, nls_1, buffer_1, files_1, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createReadStream(provider, resource, options, token) {
        const stream = buffer_1.newWriteableBufferStream();
        // do not await reading but simply return the stream directly since it operates
        // via events. finally end the stream and send through the possible error
        let error = undefined;
        doReadFileIntoStream(provider, resource, stream, options, token).then(undefined, err => error = err).finally(() => stream.end(error));
        return stream;
    }
    exports.createReadStream = createReadStream;
    async function doReadFileIntoStream(provider, resource, stream, options, token) {
        // Check for cancellation
        throwIfCancelled(token);
        // open handle through provider
        const handle = await provider.open(resource, { create: false });
        // Check for cancellation
        throwIfCancelled(token);
        try {
            let totalBytesRead = 0;
            let bytesRead = 0;
            let allowedRemainingBytes = (options && typeof options.length === 'number') ? options.length : undefined;
            let buffer = buffer_1.VSBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
            let posInFile = options && typeof options.position === 'number' ? options.position : 0;
            let posInBuffer = 0;
            do {
                // read from source (handle) at current position (pos) into buffer (buffer) at
                // buffer position (posInBuffer) up to the size of the buffer (buffer.byteLength).
                bytesRead = await provider.read(handle, posInFile, buffer.buffer, posInBuffer, buffer.byteLength - posInBuffer);
                posInFile += bytesRead;
                posInBuffer += bytesRead;
                totalBytesRead += bytesRead;
                if (typeof allowedRemainingBytes === 'number') {
                    allowedRemainingBytes -= bytesRead;
                }
                // when buffer full, create a new one and emit it through stream
                if (posInBuffer === buffer.byteLength) {
                    stream.write(buffer);
                    buffer = buffer_1.VSBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
                    posInBuffer = 0;
                }
            } while (bytesRead > 0 && (typeof allowedRemainingBytes !== 'number' || allowedRemainingBytes > 0) && throwIfCancelled(token) && throwIfTooLarge(totalBytesRead, options));
            // wrap up with last buffer (also respect maxBytes if provided)
            if (posInBuffer > 0) {
                let lastChunkLength = posInBuffer;
                if (typeof allowedRemainingBytes === 'number') {
                    lastChunkLength = Math.min(posInBuffer, allowedRemainingBytes);
                }
                stream.write(buffer.slice(0, lastChunkLength));
            }
        }
        catch (error) {
            throw files_1.ensureFileSystemProviderError(error);
        }
        finally {
            await provider.close(handle);
        }
    }
    function throwIfCancelled(token) {
        if (token && token.isCancellationRequested) {
            throw errors_1.canceled();
        }
        return true;
    }
    function throwIfTooLarge(totalBytesRead, options) {
        var _a;
        // Return early if file is too large to load and we have configured limits
        if ((_a = options) === null || _a === void 0 ? void 0 : _a.limits) {
            if (typeof options.limits.memory === 'number' && totalBytesRead > options.limits.memory) {
                throw files_1.createFileSystemProviderError(nls_1.localize('fileTooLargeForHeapError', "To open a file of this size, you need to restart and allow it to use more memory"), files_1.FileSystemProviderErrorCode.FileExceedsMemoryLimit);
            }
            if (typeof options.limits.size === 'number' && totalBytesRead > options.limits.size) {
                throw files_1.createFileSystemProviderError(nls_1.localize('fileTooLargeError', "File is too large to open"), files_1.FileSystemProviderErrorCode.FileTooLarge);
            }
        }
        return true;
    }
});
//# sourceMappingURL=io.js.map