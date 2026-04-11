from database import SessionLocal
import models
import data_store

# Open a database session
db = SessionLocal()

def seed_database():
  print("Seeding database...")

  # 1. Seed Inventory Items
  for item_data in data_store.inventoryItems:
      # db.merge will insert the item, or update it if it already exists
      db_item = models.InventoryItem(**item_data)
      db.merge(db_item)
  
  # 2. Seed Team Members
  for team_data in data_store.teamMembers:
      db_team = models.TeamMember(**team_data)
      db.merge(db_team)

  # 3. Seed Live Signals
  for signal_data in data_store.liveSignals:
      db_signal = models.LiveSignal(**signal_data)
      db.merge(db_signal)

  # Save all changes to the database
  db.commit()
  print("Database seeded successfully!")

if __name__ == "__main__":
  seed_database()