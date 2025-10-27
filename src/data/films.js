const base = import.meta.env.BASE_URL

export const films = [
    {
        title: 'Pulp Fiction',
        icon: base + 'film_icons/pulp_fiction.png',
        active: true,
    },
    {
        title: 'The Godfather',
        icon: base + 'film_icons/the_godfather.jpg',
        active: false,
    },
    {
        title: 'The Dark Knight',
        icon: base + 'film_icons/the_dark_knight.jpg',
        active: false,
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        icon: base + 'film_icons/the_lord_of_the_rings.jpg',
        active: false,
    },
] 
