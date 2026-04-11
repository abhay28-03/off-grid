from sqlalchemy import Column, Integer, String
from database import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(String, primary_key=True, index=True)
    item = Column(String, index=True)
    stock = Column(Integer)
    sales = Column(Integer)
    status = Column(String)
    action = Column(String)
    eta = Column(String)

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    status = Column(String)
    location = Column(String)
    currentTask = Column(String)
    load = Column(String)

class LiveSignal(Base):
    __tablename__ = "live_signals"

    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    summary = Column(String)
    impact = Column(String)
    signalType = Column(String)
    severity = Column(String)
    status = Column(String)
    updatedAt = Column(String)
    actionLabel = Column(String)