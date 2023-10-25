"""rewards initiated state

Revision ID: 667f2edc7d84
Revises: 1b7b6c7d73d2
Create Date: 2023-03-15 11:47:52.162015

"""
from alembic import op

# Polar Custom Imports

# revision identifiers, used by Alembic.
revision = "667f2edc7d84"
down_revision = "1b7b6c7d73d2"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("rewards", "state", server_default="initiated")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("rewards", "state", server_default="created")
    # ### end Alembic commands ###
