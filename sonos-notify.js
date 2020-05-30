module.exports = function (RED) {
    var Sonos = require('sonos');

    function SonosNotifyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var address = config.address;
        var port = config.port;
        var more = config.more;

        if (!address || !port) {
            Sonos.DeviceDiscovery().once('DeviceAvailable', device => {
                device.getAllGroups()
                    .then(groups => {
                        groups.forEach(group => {
                            registerListener(node, group.host, group.port, more);
                        })
                    })
            })
        } else {
            registerListener(node, address, port, more);
        }
    }

    function registerListener(node, address, port, moreEvents) {
        var device = new Sonos.Sonos(address, port);
        var lastTitle = '';
        var lastNextTitle = '';

        device.on('CurrentTrack', (track) => {
            if (!track || track.title == lastTitle) {
                return;
            }

            lastTitle = track.title;

            var msg = {};
            msg.event = 'CurrentTrack';
            msg.address = address;
            msg.payload = track;
            node.send(msg);
        })

        if (!moreEvents) {
            return;
        }

        device.on('NextTrack', (track) => {
            if (!track || track.title == lastNextTitle) {
                return;
            }

            lastNextTitle = track.title;

            var msg = {};
            msg.event = 'NextTrack';
            msg.address = address;
            msg.payload = track;
            node.send(msg);
        })

        device.on('PlayState', (state) => {
            var msg = {};
            msg.event = 'PlayState';
            msg.address = address;
            msg.payload = state;
            node.send(msg);
        })

        device.on('AVTransport', (transport) => {
            var msg = {};
            msg.event = 'AVTransport';
            msg.address = address;
            msg.payload = transport;
            node.send(msg);
        })

        device.on('Volume', (volume) => {
            var msg = {};
            msg.event = 'Volume';
            msg.address = address;
            msg.payload = volume;
            node.send(msg);
        })

        device.on('Muted', (mute) => {
            var msg = {};
            msg.event = 'Muted';
            msg.address = address;
            msg.payload = mute;
            node.send(msg);
        })

        device.on('RenderingControl', (eventData) => {
            var msg = {};
            msg.event = 'RenderingControl';
            msg.address = address;
            msg.payload = eventData;
            node.send(msg);
        })
    }

    RED.nodes.registerType("sonos-notify", SonosNotifyNode);
}