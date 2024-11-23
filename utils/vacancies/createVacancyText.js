export const createVacancyText = ({title, salary, description, employer, link})=> {
    const result = [];
    let text = `<b>${title}</b>\n\n`;
    text += `Зарплата: ${salary}\n\n`;
    if((title + salary + description + employer + link).length > 4000) {
        const firstDescriptionPart = description.slice(0, 2000);
        const index = firstDescriptionPart.lastIndexOf("\n");
        const firstDescription = description.slice(0, index);
        text += `${firstDescription}\n\n`;
        result.push(text);
        const secondDescription = description.slice(index);
        let secondText = `${secondDescription}\n\n`;
        secondText += `Работодатель: ${employer}\n\n`;
        secondText += `<a href="${link}">Ссылка на вакансию</a>`;
        result.push(secondText);
    } else {
        text += `${description}\n\n`;
        text += `Работодатель: ${employer}\n\n`;
        text += `<a href="${link}">Ссылка на вакансию</a>`;
        result.push(text);
    }

    return result;
}

export default createVacancyText;