import { relations } from "drizzle-orm";
import { account } from "./account.schema";
import { session } from "./session.schema";
import { twoFactor } from "./two-factor.schema";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";


export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
	  .defaultNow()
	  .$onUpdate(() => /* @__PURE__ */ new Date())
	  .notNull(),
	username: text("username").unique(),
	displayUsername: text("display_username"),
	twoFactorEnabled: boolean("two_factor_enabled").default(false),
  });
  

  export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	twoFactors: many(twoFactor),
  }));      