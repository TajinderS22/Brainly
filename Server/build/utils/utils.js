"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    let options = 'qweruoitrpykhgasdfasdlzxm243567234216890231jghsbvj-fbnncbm827190';
    let ans = '';
    let length = options.length;
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
};
exports.random = random;
