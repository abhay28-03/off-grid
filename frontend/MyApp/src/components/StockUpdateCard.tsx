import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface StockUpdateCardProps {
  itemName: string;
  initialStock: number;
  initialSales: number;
  onUpdate: (newSales: number) => void;
  style?: any;
}

export const StockUpdateCard: React.FC<StockUpdateCardProps> = ({
  itemName,
  initialStock,
  initialSales,
  onUpdate,
  style,
}) => {
  const [sales, setSales] = useState(initialSales);

  const handleDecrement = () => {
    if (sales > 0) setSales(sales - 1);
  };

  const handleIncrement = () => {
    // Cannot sell more than what is theoretically available or just unbounded logic in demo
    setSales(sales + 1);
  };

  const handleCommit = () => {
    onUpdate(sales);
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.itemName}>{itemName}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Stock: {initialStock}</Text>
        </View>
      </View>

      <Text style={styles.caption}>Log sales dynamically from the store location.</Text>

      <View style={styles.controlsRow}>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepButton} onPress={handleDecrement}>
            <Text style={styles.stepButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.salesValue}>{sales}</Text>
            <Text style={styles.salesLabel}>Sold Today</Text>
          </View>
          <TouchableOpacity style={styles.stepButton} onPress={handleIncrement}>
            <Text style={styles.stepButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleCommit}>
          <Text style={styles.updateButtonText}>Update DB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemName: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    flex: 1,
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '800',
  },
  caption: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    borderRadius: 12,
    padding: 4,
  },
  stepButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#3f3f46',
  },
  stepButtonText: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '600',
  },
  valueContainer: {
    width: 70,
    alignItems: 'center',
  },
  salesValue: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
  },
  salesLabel: {
    color: '#a1a1aa',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  updateButton: {
    marginLeft: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
});
