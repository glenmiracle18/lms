const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();
async function main() {
    try {
        const categories = [
            { name: "Computer Science" },
            { name: "Accounting" },
            { name: "Engineering" },
            { name: "Robotics" },
            { name: "Photography" },
            { name: "Fitness" },
            { name: "Music" },
            { name: "Content Creation" },
            { name: "Sports" },
        ];

        // loops through the categories and creates them in the database. 
        //If a category already exists, it will not be created again.
        for (const category of categories) {
            // Use upsert to create or update the category
            await database.category.upsert({
                where: { name: category.name },
                update: {}, // No updates if the category already exists
                create: { name: category.name },
            });
        }

        console.log("Success seeding categories...");
    } catch (error) {
        console.log("Error seeding the database categories...", error);
    } finally {
        await database.$disconnect();
    }
}
main();