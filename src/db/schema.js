import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// =====================================================
// USERS TABLE
// =====================================================

export const users = mysqlTable(
  "users",
  {
    id: int("id").autoincrement().primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    email: varchar("email", {
      length: 255,
    })
      .notNull()
      .unique(),

    phoneNo: varchar("phone_no", {
      length: 20,
    })
      .notNull()
      .unique(),

    password: varchar("password", {
      length: 255,
    }).notNull(),

    role: mysqlEnum("role", ["admin", "owner", "staff"])
      .notNull()
      .default("staff"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIndex: index("users_email_idx").on(table.email),
    phoneIndex: index("users_phone_no_idx").on(table.phoneNo),
    roleIndex: index("users_role_idx").on(table.role),
  })
);

// =====================================================
// REFRESH TOKENS TABLE
// =====================================================

export const refreshTokens = mysqlTable(
  "refresh_tokens",
  {
    id: int("id").autoincrement().primaryKey(),

    userId: int("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    token: varchar("token", {
      length: 500,
    })
      .notNull()
      .unique(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    // Fixed: Added a default fallback (e.g., current timestamp or letting it be nullable if handled explicitly in code)
    expiresAt: timestamp("expires_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("refresh_tokens_user_id_idx").on(
      table.userId
    ),
  })
);