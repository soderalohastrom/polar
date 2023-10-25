"""add rewards email

Revision ID: 7f5224936909
Revises: 667f2edc7d84
Create Date: 2023-03-16 10:23:05.196803

"""
import sqlalchemy as sa
from alembic import op

# Polar Custom Imports

# revision identifiers, used by Alembic.
revision = "7f5224936909"
down_revision = "667f2edc7d84"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("rewards", sa.Column("email", sa.String(), nullable=True))
    op.execute("update rewards set email = 'unknown@example.com'")
    op.alter_column("rewards", "email", nullable=False)
    op.create_index(op.f("ix_rewards_email"), "rewards", ["email"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_rewards_email"), table_name="rewards")
    op.drop_column("rewards", "email")
    # ### end Alembic commands ###
