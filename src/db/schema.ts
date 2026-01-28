
import { integer,numeric, pgEnum, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";


export const badgeValues = ["New", "Sale", "Featured", "Limited"] as const
export const InventoryValues = ["in-stock", "backorder", "preorder"]as const
// export const InventoryValues = ["in-stock", "backorder", "preorder"] as const
export const badgeEnum = pgEnum('badge', badgeValues)
export const invertoryEnum = pgEnum("inventory",InventoryValues)

export const products = pgTable("products", {
    id : uuid('id').primaryKey().defaultRandom(),
    name : varchar('name', {length : 256}).notNull(),
    description : text('description').notNull(),
    price : numeric('price', {precision : 10, scale : 2}).notNull(),
    badge : badgeEnum('badge'),
    rating : numeric('rating', {precision : 3, scale : 2}).notNull().default('0'),
    reviews : integer('reviews').notNull().default(0),
    image : varchar('image', {length : 512}).notNull(),
    inventory : invertoryEnum('inventory').notNull().default('in-stock'),
    createdAt : timestamp('created_at').defaultNow().notNull()
})
export type ProductSelect = typeof products.$inferSelect
export type ProductInsert = typeof products.$inferSelect

export const cartItems = pgTable('cart_items',{
    id : uuid('id').primaryKey().defaultRandom(),
    productId : uuid('product_id').notNull().references(()=> products.id, {onDelete : 'cascade'}),
    quantity : integer('quantity').notNull().default(1),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export type CartItemSelect = typeof cartItems.$inferSelect
export type CartItemInsert = typeof cartItems.$inferInsert

// export enum

export type BadgeValue = (typeof badgeValues)[number]
export type InvertoryEnum = (typeof InventoryValues)[number]