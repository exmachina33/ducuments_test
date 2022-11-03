export const categoriesData = [
    {
        id: 1,
        order: 100,
        name: 'Обязательные для всех',
        description: 'Документы, обязательные для всех сотрудников без исключения'
    },
    {
        id: 2,
        order: 200,
        name: 'Обязательные для трудоустройства',
        description: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от гражданства'
    },
    {
        id: 3,
        order: 300,
        name: 'Специальные',
        description: null
    },
]
export const filesData = [
    {
        id: 4,
        order: 100,
        categoryId: 1,
        name: 'Паспорт',
        priority: 'Обязательный',
        description: 'Для всех'
    },
    {
        id: 5,
        order: 200,
        categoryId: 1,
        name: 'ИНН',
        priority: 'Обязательный',
        description: 'Для всех'
    },
    {
        id: 11,
        order: 300,
        categoryId: 1,
        name: 'Трудовой договор',
        priority: null,
        description: null
    },
    {
        id: 6,
        order: 300,
        categoryId: null,
        name: 'Тестовое задание кандидата',
        priority: null,
        description: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха'
    },
    {
        id: 8,
        order: 200,
        categoryId: null,
        name: 'Мед. книжка',
        priority: null,
        description: null
    },
]