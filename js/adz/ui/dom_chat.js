"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MAX_MESSAGE_COUNT = 6;
var ChatPrompt = (function (_super) {
    __extends(ChatPrompt, _super);
    function ChatPrompt() {
        var _this = this;
        _super.call(this);
        this.show = mz.delayer(function () {
            if (!_this.chatVisible) {
                _this.chatVisible = true;
                _this.input.value = '';
                _this.input.focus();
            }
        }, 100);
        this.messages = new mz.Collection;
        this.input = this.find('input')[0];
        setInterval(function () { return _this.messages.length && _this.messages.removeAt(0); }, 30000);
        this.chatVisible = false;
    }
    ChatPrompt.prototype.hookKeys = function (e) {
        if (e.event.which == 13 && this.chatVisible) {
            this.show.cancel();
        }
    };
    ChatPrompt.prototype.keyPressed = function (e) {
        if (e.event.which == 13) {
            if ($(this.input).val().length) {
                this.emit('chat', $(this.input).val());
            }
            this.chatVisible = false;
            this.show.cancel();
        }
    };
    ChatPrompt.prototype.pushMessage = function (message) {
        this.messages.push(message);
        while (this.messages.length > MAX_MESSAGE_COUNT) {
            this.messages.removeAt(0);
        }
    };
    __decorate([
        ChatPrompt.proxy, 
        __metadata('design:type', Boolean)
    ], ChatPrompt.prototype, "chatVisible", void 0);
    __decorate([
        ChatPrompt.proxy, 
        __metadata('design:type', mz.Collection)
    ], ChatPrompt.prototype, "messages", void 0);
    ChatPrompt = __decorate([
        ChatPrompt.Template("\n    <div style=\"position: absolute; top:0; left: 0; width: 800px\">\n        <mz-repeat list=\"{this.messages}\" tag=\"div\" style=\"\n            opacity: 0.5; \n            font-size: 0.8em; \n            padding: 20px; \n            pointer-events: none; \n            user-select: none;\n            -webkit-user-select: none;\n        \">\n            <div style=\"\n                max-width: 760px;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                word-break: break-all;\n                max-height: 2.4em;\n                color: {scope.color || 'white'}\n            \"><b>{scope.nick}</b> {scope.text}</div>\n        </mz-repeat>\n        \n        <input visible=\"{this.chatVisible}\" name=\"chatInput\" onkeyup=\"{this.keyPressed}\" onkeydown=\"{this.hookKeys}\" placeholder=\"Chat\" style=\"\n            position: absolute;\n            background: rgba(100,100,100,0.5);\n            color: white;\n            top: 3px;\n            left: 3px;\n            width: 794px;\n            border: 0;\n            border-bottom: 1px solid rgba(50,50,50,0.8);\n            padding: 7px 11px;\n            outline: none;\n            box-shadow: 0px 0px 4px 1px black inset;\n        \"/>\n    </div>\n"),
        ChatPrompt.ConfigureUnwrapped, 
        __metadata('design:paramtypes', [])
    ], ChatPrompt);
    return ChatPrompt;
}(mz.widgets.BasePagelet));
exports.ChatPrompt = ChatPrompt;
exports.chatPromptInstance = new ChatPrompt;
