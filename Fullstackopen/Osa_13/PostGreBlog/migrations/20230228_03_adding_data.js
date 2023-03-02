module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.bulkInsert('users', [
        {
            username: 'johndoe@example.com',
            name: 'John Doe',
            id: 1,
            admin: true,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'janedoe@example.com',
            name: 'Jane Doe',
            id: 2,
            admin: false,
            disabled: true,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'michalejackson@example.com',
            name: 'Michael Jackson',
            id: 3,
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'miketyson2231@example.com',
            name: 'Mike Tyson',
            id: 4,
            admin: true,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        }
      ])
      await queryInterface.bulkInsert('blogs', [
        {
            url: 'www.bestpopsingers.com',
            id: 1,
            author: 'Pop enthusiast',
            title: 'How to create a long lasting legacy with music',
            likes: 87,
            user_id: 2,
            year: 2007
        },
        {
            url: 'www.boxingwebsite.net',
            id: 2,
            author: 'Interesting person',
            title: 'The most feared man in the ring',
            likes: 8237,
            user_id: 4,
            year: 1994
        },
        {
            url: 'www.botanist.net',
            author: 'Bear club',
            id: 3,
            title: 'How to grow potatoes in ice',
            likes: 8,
            user_id: 3,
            year: 2012
        },
        {
            url: 'www.building-stuff.net',
            author: 'bob the builder',
            id: 4,
            title: 'How to reuse construction material',
            likes: 921,
            user_id: 1,
            year: 2019
        },
      ])
      await queryInterface.bulkInsert('readinglists', [
        {
            blog_id: 2,
            user_id: 3
        },
        {

            blog_id: 3,
            user_id: 2
        },
        {

            blog_id: 1,
            user_id: 4
        },
        {   

            blog_id: 4,
            user_id: 1
        },
        {
            blog_id: 1,
            user_id: 3
        }        
      ])
    },
  
    down: async ({context: queryInterface}) => {
        await queryInterface.bulkDelete('blogs')
        await queryInterface.bulkDelete('users')
        await queryInterface.bulkDelete('readinglists')
    },
  }