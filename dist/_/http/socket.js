import { Socket } from 'net';
import crypto from 'crypto';
const socket = (server) => {
    const clients = [];
    server.http.on('upgrade', (req, socket, head) => {
        let upgrade = req.headers['upgrade'] === 'websocket';
        if (!upgrade || !(socket instanceof Socket)) {
            socket.destroy();
            req.destroy();
            return;
        }
        socket.setTimeout(0);
        socket.setNoDelay(true);
        socket.setKeepAlive(true, 0);
        if (head?.length)
            socket.unshift(head);
        let key = req.headers['sec-websocket-key'];
        let accept = sec(key || '');
        let headers = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: WebSocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${accept}`
        ];
        let connect = client(socket, () => {
            let i = clients.indexOf(connect);
            if (i >= 0)
                clients.splice(i, 1);
        });
        socket.write(headers.join('\r\n') + '\r\n\r\n');
        if (!connect.socket.destroyed) {
            clients.push(connect);
        }
    });
    return {
        ...server,
        clients
    };
};
const sec = (key) => {
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    return crypto.createHash('sha1').update(key + GUID).digest('base64');
};
const buf = (data) => {
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    let size = Buffer.byteLength(data);
    let length = size;
    let offset = 2;
    if (size >= 65536) {
        length = 127;
        offset += 8;
    }
    else if (size > 125) {
        length = 126;
        offset += 2;
    }
    let buffer = Buffer.allocUnsafe(offset + size);
    buffer.writeUInt8(0x80 | 0x01, 0);
    buffer.writeUInt8(length, 1);
    if (length === 126) {
        buffer.writeUInt16BE(size, 2);
    }
    else if (length === 127) {
        buffer.writeUInt16BE(0x0000, 2);
        buffer.writeUIntBE(size, 4, 6);
    }
    buffer.write(data, offset);
    return buffer;
};
const client = (socket, cb) => {
    const write = data => socket.write(buf(data));
    const destroy = () => {
        socket.removeListener('error', destroy);
        socket.removeListener('close', destroy);
        socket.removeListener('end', destroy);
        socket.destroy();
        cb();
    };
    socket.allowHalfOpen = false;
    socket.once('error', destroy);
    socket.once('close', destroy);
    socket.once('end', destroy);
    socket.resume();
    return {
        socket,
        destroy,
        write
    };
};
export default socket;
