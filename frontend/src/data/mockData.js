
export const currentUser = {
    id: 1,
    name: "Александр Петров",
    balance: 1000,
    avatar: "http://static.photos/people/200x200/42",
};

export const offers = [
    {
        id: 1,
        userId: 2,
        author: "Мария Иванова",
        avatar: "http://static.photos/people/200x200/1",
        title: "Научу играть на гитаре",
        description: "Базовые аккорды, переборы, простые песни. 5 занятий по часу каждое. Для начинающих.",
        category: "music",
        price: 150,
        image: "http://static.photos/music/640x360/1",
        createdAt: "2023-10-15"
    },
    {
        id: 2,
        userId: 3,
        author: "Дмитрий Соколов",
        avatar: "http://static.photos/people/200x200/2",
        title: "Объясню производные и интегралы",
        description: "Математический анализ для школьников и студентов. Помогу разобраться с производными, интегралами, пределами.",
        category: "education",
        price: 200,
        image: "http://static.photos/education/640x360/1",
        createdAt: "2023-10-14"
    },
    {
        id: 3,
        userId: 4,
        author: "Анна Кузнецова",
        avatar: "http://static.photos/people/200x200/3",
        title: "Уроки рисования акварелью",
        description: "Научу основам акварельной живописи. Материалы не нужны - всё предоставлю.",
        category: "art",
        price: 180,
        image: "http://static.photos/art/640x360/1",
        createdAt: "2023-10-13"
    },
    {
        id: 4,
        userId: 5,
        author: "Сергей Волков",
        avatar: "http://static.photos/people/200x200/4",
        title: "Программирование на Python",
        description: "Базовый курс Python. Переменные, циклы, функции, работа с файлами. 3 занятия.",
        category: "tech",
        price: 250,
        image: "http://static.photos/technology/640x360/1",
        createdAt: "2023-10-12"
    },
    {
        id: 5,
        userId: 6,
        author: "Елена Попова",
        avatar: "http://static.photos/people/200x200/5",
        title: "Йога для начинающих",
        description: "Асаны, дыхательные практики, расслабление. Онлайн или офлайн в парке.",
        category: "sport",
        price: 120,
        image: "http://static.photos/wellness/640x360/1",
        createdAt: "2023-10-11"
    },
    {
        id: 6,
        userId: 1,
        author: "Александр Петров",
        avatar: "http://static.photos/people/200x200/42",
        title: "Фотография для начинающих",
        description: "Композиция, свет, настройки камеры. Помогу разобраться с ручным режимом.",
        category: "art",
        price: 160,
        image: "http://static.photos/camera/640x360/1",
        createdAt: "2023-10-10"
    }
];

export let transactions = [
    { id: 1, type: 'purchase', offerTitle: "Английский разговорный", amount: 200, date: "2023-10-14", with: "Иван Сидоров" },
    { id: 2, type: 'sale', offerTitle: "Фотография для начинающих", amount: 160, date: "2023-10-12", with: "Ольга Смирнова" },
    { id: 3, type: 'purchase', offerTitle: "Готовка итальянской пасты", amount: 130, date: "2023-10-08", with: "Павел Морозов" }
];