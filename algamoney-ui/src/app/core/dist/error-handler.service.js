"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorHandlerService = void 0;
var core_1 = require("@angular/core");
var money_http_1 = require("app/seguranca/money-http");
var ErrorHandlerService = /** @class */ (function () {
    function ErrorHandlerService(toasty, router) {
        this.toasty = toasty;
        this.router = router;
    }
    ErrorHandlerService.prototype.handle = function (errorResponse) {
        var msg;
        if (typeof errorResponse === 'string') {
            msg = errorResponse;
        }
        else if (errorResponse instanceof money_http_1.NotAuthenticateError) {
            msg = 'Sua sessão expirou!';
            this.router.navigate(['/login']);
        }
        else if (errorResponse instanceof Response
            && errorResponse.status >= 400 && errorResponse.status <= 499) {
            var errors = void 0;
            msg = 'Ocorreu um erro ao processar a sua solicitação';
            if (errorResponse.status === 403) {
                msg = 'Você não tem permissáo para executar essa ação!';
            }
            try {
                errors = errorResponse.json();
                msg = errors[0].mensagemUsuario;
            }
            catch (e) { }
            console.error('Ocorreu um erro', errorResponse);
        }
        else {
            msg = 'Erro ao processar serviço remoto. Tente novamente.';
            console.error('Ocorreu um erro', errorResponse);
        }
        this.toasty.error(msg);
    };
    ErrorHandlerService = __decorate([
        core_1.Injectable()
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
