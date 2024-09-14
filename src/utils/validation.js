import { 
    Form as VeeForm,
    Field as VeeField,
    defineRule, ErrorMessage,
    configure
 } from "vee-validate";

 import {
    required, min, max, email, alpha_spaces as alphaSpaces, 
    min_value as minVal, max_value as maxVal, 
    confirmed, not_one_of as excluded
 } from '@vee-validate/rules';


 export default{
    install(app){
        app.component('VeeForm', VeeForm);
        app.component('Field', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required); 
        defineRule('checkbox', required); 
        defineRule('min', min); 
        defineRule('max', max); 
        defineRule('email', email);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('min_value', minVal); 
        defineRule('max_value', maxVal); 
        defineRule('password_mismatch', confirmed);
        defineRule('excluded', required); 

        configure({
            generateMessage: (ctx) => {
                const message = {
                    required: `This field ${ctx.field} is required`,
                    min: `This field ${ctx.field} is too short`,
                    checkbox: `You must checked/select a terms of service.`,
                    max: `This field ${ctx.field} is too long`,
                    alpha_spaces: `This field ${ctx.field} may only contains alphabet and spaces.`,
                    email: `This field ${ctx.field} is must be a valid email.`,
                    min_value: `This field ${ctx.field} is too low`,
                    max_value: `This field ${ctx.field} is too high.`,
                    password_mismatch: `Password does not match!`,
                }
            }
        })
    }
 }