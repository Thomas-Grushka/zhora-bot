import jsdom from "jsdom";

const {JSDOM} = jsdom;

const getDocument = data => {
    const dom = new JSDOM(data);
    const {document} = dom.window;

    return document;
}

const parseVacancy = (data, {userId, resource}) => {
    const dom = getDocument(data);
    const schema = JSON.parse(dom.querySelector(`script[type="application/ld+json"]`).textContent);
    const link = schema.sameAs;
    const resourceId = schema.identifier.value;
    const {title, datePosted} = schema;
    const timePosted = dom.querySelector(`[data-marker="item-view/item-date"]`).textContent.split(" ").pop();
    const date = `${datePosted} ${timePosted}`;
    const salary = dom.querySelector(`[data-marker="item-view/item-price"]`).textContent;
    let description = `<b>Условия</b>\n`;
    const conditions = dom.querySelectorAll(".params-paramsList-_awNW .params-paramsList__item-_2Y2O");
    for(const condition of conditions) {
        description += `- ${condition.textContent}\n`;
    }
    description += "\n";

    description += "<b>Расположение</b>\n";
    const location = dom.querySelector(".style-item-address-KooqC").textContent;
    description += `${location}\n\n`;

    description += "<b>Описание</b>\n";
    const content = dom.querySelector(`[data-marker="item-view/item-description"]`).children;
    for(const item of content) {
        if(item.tagName === "P" && item.innerHTML === "<br>") {
            description += "\n\n";
        }
        if(item.tagName === "P" && item.innerHTML !== "<br>") {
            description += `${item.textContent}\n`;
        }
        if(item.tagName === "OL") {
            for(let i = 0; i < item.children.length; i++) {
                const text = item.children[i].textContent;
                description += `${i+1}. ${text}\n`;
            }
            description += "\n";
        }
        if(item.tagName === "UL") {
            for(let i = 0; i < item.children.length; i++) {
                const text = item.children[i].textContent;
                description += `- ${text}\n`;
            }
            description += "\n";
        }
    }

    const employer = schema.hiringOrganization.name;

    return {
        userId,
        resource,
        link,
        resourceId,
        title,
        salary,
        description,
        employer,
        date,
        publishCount: 0,
    };
}

export default parseVacancy;


