"""issue.badge_custom_content

Revision ID: 3d5320d33431
Revises: f4f4c1b37f93
Create Date: 2023-06-12 15:55:37.182649

"""
import sqlalchemy as sa
from alembic import op

# Polar Custom Imports
from polar.kit.extensions.sqlalchemy import PostgresUUID

# revision identifiers, used by Alembic.
revision = "3d5320d33431"
down_revision = "f4f4c1b37f93"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "issues", sa.Column("badge_custom_content", sa.String(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("issues", "badge_custom_content")
    # ### end Alembic commands ###
