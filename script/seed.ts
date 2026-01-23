process.env.NITRO_PRESET = 'node-server'
process.env.NODE_ENV = process.env.NODE_ENV || "production"
import {
    badgeValues,
    inventoryValues,
} from "../src/db/schema"


export const sampleProducts = [
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0]
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0]
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[1],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[2],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[3],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[2]
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[1],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[1],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[2],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[2],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[3],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[1],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[2],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[1],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[0],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[1],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[1],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[1],
    },
    {
        name: "TanStack Router Pro",
        description: "The most powerful routiing solution for React. Build with TypeScript featuring type-safe routes, code splitting, and server-side rendering",
        price: "99.99",
        badge: badgeValues[3],
        rating: "4.8",
        reviews: 127,
        image: "https://avatars.githubusercontent.com/u/124164882?v=4",
        inventory: inventoryValues[0],
    },

]

async function seed() {
    try {
        const { db } = await import("../src/db/index")
        const { products } = await import("../src/db/schema")
        console.log("Starting putting data into the Database....")

        const shouldReset = process.argv.includes('--reset') || process.argv.includes('-r')

        if (shouldReset) {
            console.log('Clearing existin products...')
            await db.delete(products)
            console.log('Cleared all products')
        } else {
            const existingProducts = await db.select().from(products).limit(1)
            if (existingProducts.length > 0) {
                console.log('Products already exist inthe databse')
                console.log('  Run with --reset flag to clear and reseed: bun run db:seed -- --reset')
                process.exit(0)
            }
        }
        // inserting sample products
        console.log(`Inserting ${sampleProducts.length} products....`)
        await db.insert(products).values(sampleProducts)
    } catch (e) {
        console.error('Error seeding database', e)
    }
}


// This script shoud only run when executed via bun run db:seed
// it should not run when imported by other modules (like vite during dev)

const isRunningScript = process.argv[1]?.includes("seed.ts") || process.argv[1].includes("bun")
if(isRunningScript){
    seed().then(r => {
        console.log("successfully seed the data")
        process.exit(0)
    }).catch(e => {
        console.log("unable to seeding the data ", e)
    })    
}

// if anything is breaking then use this below
// seed().then(r => {
//     console.log("successfully seed the data")
//     process.exit(0)
// }).catch(e => {
//     console.log("unable to seeding the data ", e)
// })