-- Neon PostgreSQL starter schema. Run only after reviewing privacy/retention requirements.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS customers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 full_name text NOT NULL,
 date_of_birth date,
 email text UNIQUE NOT NULL,
 phone text UNIQUE,
 password_hash text,
 email_verified_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS products (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 slug text UNIQUE NOT NULL,
 name text NOT NULL,
 description text NOT NULL,
 category text NOT NULL,
 price_paise integer NOT NULL CHECK(price_paise >= 0),
 stock integer NOT NULL DEFAULT 0 CHECK(stock >= 0),
 images jsonb NOT NULL DEFAULT '[]'::jsonb,
 active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS orders (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id),
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','processing','shipped','delivered','cancelled','refunded','payment_failed')),
 subtotal_paise integer NOT NULL CHECK(subtotal_paise >= 0),
 shipping_paise integer NOT NULL DEFAULT 0 CHECK(shipping_paise >= 0),
 currency char(3) NOT NULL DEFAULT 'INR',
 payment_provider text,
 provider_order_id text,
 provider_payment_id text,
 shipping_address jsonb NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS order_items (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 product_id uuid REFERENCES products(id),
 product_name_snapshot text NOT NULL,
 unit_price_paise integer NOT NULL CHECK(unit_price_paise >= 0),
 quantity integer NOT NULL CHECK(quantity > 0)
);
CREATE TABLE IF NOT EXISTS security_events (
 id bigserial PRIMARY KEY,
 customer_id uuid REFERENCES customers(id),
 event_type text NOT NULL,
 ip_hash text,
 user_agent text,
 created_at timestamptz NOT NULL DEFAULT now()
);
-- Do not store raw passwords, payment card data, or unnecessary full IP histories.
-- Use least-privilege database credentials and row-level access patterns in the application.
