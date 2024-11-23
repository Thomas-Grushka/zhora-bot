import {Markup} from "telegraf";

export function getStartButton(){
    const buttons = [
        Markup.button.callback("Выбрать страну", "start-select-country")];

    return Markup.inlineKeyboard(buttons);
}

export function getCountriesButtons(data) {
    const buttons = data.map(({name, id}) => Markup.button.callback(name, `country-${id}`));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getCitiesButtons(data) {
    const buttons = data.map(({name, id}) => Markup.button.callback(name, `city-${id}`));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getAfterSelectCityButtons(cityId) {
    const buttons = [
        Markup.button.callback("Выбрать пригород", `select-subcity-${cityId}`),
        Markup.button.callback("Выбрать сферу", `select-scope`),
    ];

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getSubCitiesButtons(data) {
    const buttons = data.map(({name, id}) => Markup.button.callback(name, `subcity-${id}`));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getScopeButtons(data) {
    const buttons = data.map(({name, dataMarker}) => Markup.button.callback(name, `scope-${dataMarker}`));

    return Markup.inlineKeyboard(buttons, {
        columns: 1,
    });
}

export function getAfterSelectScopeButtons(scopeId) {
    const buttons = [
        Markup.button.callback("Выбрать еще одну сферу", `select-scope`),
        Markup.button.callback("Выбрать профессию", `select-professions-${scopeId}`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getProfessionButtons(data, scopeId) {
    // const buttons = data.map(({name, dataMarker}) => Markup.button.callback(name, `profession-${dataMarker}-${scopeId}`));
    const buttons = data.map(({name, dataMarker}) => Markup.button.callback(name, `profession-fff`));
    // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getAfterSelectProfessionButtons() {
    const buttons = [
        Markup.button.callback("Выбрать еще одну профессию", `select-scope`),
        Markup.button.callback("Выбрать типа занятости", `select-employment-type`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getEmploymentTypesButtons(data) {
    const buttons = [
        Markup.button.callback("Полная занятость", `employment-type-full`),
        Markup.button.callback("Частичная занятость", `employment-type-part`),
        Markup.button.callback("Временная занятость", `employment-type-time`),
        Markup.button.callback("Стажировка", `employment-type-study`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];
    // const buttons = data.map(value => Markup.button.callback(value, `employment-type-${value}`));
    // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function geAfterEmploymentTypesButtons(data) {
    const buttons = [
        Markup.button.callback("Выбрать тип занятости", `select-employment-type`),
        Markup.button.callback("Выбрать режим работы", `select-operating-mode`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];
    // const buttons = data.map(value => Markup.button.callback(value, `employment-type-${value}`));
    // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function getOperationModeButtons(data) {
    const buttons = [
        Markup.button.callback("Фиксированный график", `operation-mode-fix`),
        Markup.button.callback("Гибкий график", `operation-mode-flex`),
        Markup.button.callback("Сменный график", `operation-mode-change`),
        Markup.button.callback("Вахта", `operation-mode-ddd`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];
    // const buttons = data.map(value => Markup.button.callback(value, `employment-type-${value}`));
    // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

export function geAfterOperationTypeButtons(data) {
    const buttons = [
        Markup.button.callback("Выбрать режим работы", `select-employment-type`),
        Markup.button.callback("Начать получать вакансии", `get-vacancies`),
        // Markup.button.callback("Получить вакансии", `get-vacancies`),
    ];
    // const buttons = data.map(value => Markup.button.callback(value, `employment-type-${value}`));
    // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));

    return Markup.inlineKeyboard(buttons, {
        columns: 2,
    });
}

// export function getMainButtons(finishConfig = false){
//     const buttons = [
//         Markup.button.callback("Выбор страны", "select-country"),
//         // Markup.button.callback("Выбор города", "select-city"),
//         Markup.button.callback("Выбор категории", "select-category"),
//         Markup.button.callback("Уровень зарплаты", "select-salary"),
//         Markup.button.callback("Тип занятости", "select-employment"),
//         Markup.button.callback("Тип работы", "select-work-type")];
//     if(finishConfig) {
//         buttons.push(Markup.button.callback("Начать получать вакансии", "start-display-vacancy"));
//     }
//     return Markup.inlineKeyboard(buttons,
//         {
//             columns: 3,
//         });
// }


//

//

//

//

//
// export function getProfessionsButtons(data: []) {
//     const buttons = data.map(({name, id}) => Markup.button.callback(name, `profession-${id}`));
//     // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterSelectProfessionButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще одну профессию", `select-profession`),
//         Markup.button.callback("Уровень зарплаты", `select-salary`),
//         Markup.button.callback("Тип занятости", `select-employment-type`),
//         Markup.button.callback("Тип работы", `select-work-type`),
//         Markup.button.callback("Получить вакансии", `select-vacancies`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterSelectProfessionNotCountryButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще одну профессию", `select-profession`),
//         Markup.button.callback("Выбрать страну", `select-country`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterSelectProfessionNotCityButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще одну профессию", `select-profession`),
//         Markup.button.callback("Выбрать город", `select-city`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getSalariesButtons(data: []) {
//     const buttons = data.map((value: string) => {
//         if(value.includes("до")) {
//             return Markup.button.callback(value, `salary-500`);
//         }
//         return Markup.button.callback(value, `salary-${value}`);
//     });
//     // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterSelectSalaryButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще один диапазон зарплат", `select-salary`),
//         Markup.button.callback("Выбрать страну", `select-country`),
//         Markup.button.callback("Выбрать город", `select-city`),
//         Markup.button.callback("Выбрать тип занятости", `select-employment-type`),
//         Markup.button.callback("Выбрать тип работы", `select-work-type`),
//         Markup.button.callback("Получить вакансии", `select-vacancies`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterSelectEmploymentTypeButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще один тип занятости", `select-employment-type`),
//         Markup.button.callback("Выбрать страну", `select-country`),
//         Markup.button.callback("Выбрать город", `select-city`),
//         Markup.button.callback("Выбрать зарплату", `select-salary`),
//         Markup.button.callback("Выбрать тип работы", `select-work-type`),
//         Markup.button.callback("Получить вакансии", `select-vacancies`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getAfterWorkTypeButtons() {
//     const buttons = [
//         Markup.button.callback("Выбрать еще один тип работы", `select-employment-type`),
//         Markup.button.callback("Выбрать страну", `select-country`),
//         Markup.button.callback("Выбрать город", `select-city`),
//         Markup.button.callback("Выбрать зарплату", `select-salary`),
//         Markup.button.callback("Выбрать тип занятости", `select-employment-type`),
//         Markup.button.callback("Получить вакансии", `select-vacancies`),
//     ];
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getEmploymentTypesButtons(data: []) {
//     const buttons = data.map(value => Markup.button.callback(value, `employment-type-${value}`));
//     // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }
//
// export function getWorkTypesButtons(data: []) {
//     const buttons = data.map(value => Markup.button.callback(value, `work-type-${value}`));
//     // buttons.push(Markup.button.callback("↩️Назад", "country-go-back"));
//
//     return Markup.inlineKeyboard(buttons, {
//         columns: 2,
//     });
// }