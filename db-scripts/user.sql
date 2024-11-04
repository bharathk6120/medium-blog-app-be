CREATE TYPE singn_in_type AS ENUM ('google', 'email_password');

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  email_id VARCHAR(512) NOT NULL,
  password_hash VARCHAr(512) DEFAULT NULL,
  singn_in_type singn_in_type NOT NULL,
  email_verfied_at TIMESTAMP DEFAULT NULL,
  deactivated_at TIMESTAMP DEFAULT NULL,
  delete_requested_at TIMESTAMP DEFAULT NULL,
  deleted_at  TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD CONSTRAINT pk_id UNIQUE(id);
ALTER TABLE users ADD CONSTRAINT uk_user_id UNIQUE(user_id);
ALTER TABLE users ADD CONSTRAINT uk_email_id UNIQUE(email_id);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();