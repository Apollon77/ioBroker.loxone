"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoOnlyText = void 0;
const control_base_1 = require("./control-base");
class InfoOnlyText extends control_base_1.ControlBase {
    async loadAsync(type, uuid, control) {
        await this.updateObjectAsync(uuid, {
            type: type,
            common: {
                name: control.name,
                role: 'info',
            },
            native: { control },
        });
        await this.loadOtherControlStatesAsync(control.name, uuid, control.states, ['text']);
        await this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'text', 'string', 'text');
        if (!control.hasOwnProperty('details')) {
            return;
        }
        if (control.details.hasOwnProperty('format')) {
            await this.updateStateObjectAsync(uuid + '.text-formatted', {
                name: control.name + ': formatted value',
                read: true,
                write: false,
                type: 'string',
                role: 'text',
                // TODO: re-add: smartIgnore: true,
            }, control.states.value, async (name, value) => {
                await this.setFormattedStateAck(name, value, control.details.format);
            });
        }
    }
}
exports.InfoOnlyText = InfoOnlyText;
//# sourceMappingURL=InfoOnlyText.js.map