import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Wallet, Trash2, AlertCircle } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { getTheme } from '../constants/theme';
import { Button } from '../components/ui/Button';

export default function ExpenseTrackerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const themeMode = useAppStore((state) => state.themeMode);
  const expenseTracker = useAppStore((state) => state.expenseTracker);
  const addExpense = useAppStore((state) => state.addExpense);
  const deleteExpense = useAppStore((state) => state.deleteExpense);
  const theme = getTheme(themeMode);

  const [showAddForm, setShowAddForm] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food & Dining');
  const [formError, setFormError] = useState('');

  const remainingBudget = Math.max(0, expenseTracker.budgetAmount - expenseTracker.spentAmount);
  const progressRatio = Math.min(
    expenseTracker.spentAmount / (expenseTracker.budgetAmount || 1),
    1.0
  );

  const handleAddExpenseSubmit = () => {
    setFormError('');
    if (!expenseTitle.trim()) {
      setFormError('Please enter an expense title.');
      return;
    }
    const parsedAmount = parseFloat(expenseAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError('Please enter a valid positive amount.');
      return;
    }

    addExpense({
      title: expenseTitle.trim(),
      amount: parsedAmount,
      category: selectedCategory,
    });

    setExpenseTitle('');
    setExpenseAmount('');
    setShowAddForm(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
      {/* Header */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
          ]}
        >
          Expenses
        </Text>
        <Pressable
          onPress={() => setShowAddForm(!showAddForm)}
          accessibilityRole="button"
          accessibilityLabel="Add expense"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[styles.addBtn, { backgroundColor: theme.colors.accentSubtle }]}
        >
          <Plus size={18} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Budget Summary */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.topBudgetSection}>
          <View style={styles.amountDisplayRow}>
            <View>
              <Text
                style={[
                  styles.spentAmount,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                {expenseTracker.spentFormatted}
              </Text>
              <Text style={[styles.amountSublabel, { color: theme.colors.textSecondary }]}>
                total spent
              </Text>
            </View>
            <View style={styles.budgetRightColumn}>
              <Text
                style={[
                  styles.budgetAmount,
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.serifSemiBold },
                ]}
              >
                {expenseTracker.budgetFormatted}
              </Text>
              <Text style={[styles.amountSublabel, { color: theme.colors.textMuted }]}>
                {expenseTracker.currency}{remainingBudget.toLocaleString()} remaining
              </Text>
            </View>
          </View>

          {/* Progress */}
          <View style={[styles.progressTrack, { backgroundColor: theme.colors.bgSubtle }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressRatio * 100}%`,
                  backgroundColor: progressRatio > 0.9 ? theme.colors.destructive : theme.colors.accentBrand,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Add Form */}
        {showAddForm && (
          <Animated.View
            entering={FadeInUp.duration(300)}
            style={[
              styles.addFormCard,
              { backgroundColor: theme.colors.bgSurface, borderColor: theme.colors.borderSubtle },
            ]}
          >
            <Text
              style={[
                styles.formTitle,
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold },
              ]}
            >
              Log Expense
            </Text>

            {formError !== '' && (
              <View style={styles.errorBox}>
                <AlertCircle size={13} color={theme.colors.destructive} style={{ marginRight: 6 }} />
                <Text style={[styles.errorText, { color: theme.colors.destructive }]}>
                  {formError}
                </Text>
              </View>
            )}

            <TextInput
              value={expenseTitle}
              onChangeText={setExpenseTitle}
              placeholder="Title (e.g. Ramen Lunch)"
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.formInput,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderSubtle,
                  backgroundColor: theme.colors.bgSubtle,
                  fontFamily: theme.fonts.sansRegular,
                },
              ]}
            />

            <TextInput
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              placeholder="Amount (e.g. 4200)"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.formInput,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderSubtle,
                  backgroundColor: theme.colors.bgSubtle,
                  fontFamily: theme.fonts.sansRegular,
                },
              ]}
            />

            <Button title="Save Expense" onPress={handleAddExpenseSubmit} variant="primary" style={{ marginTop: 4 }} />
          </Animated.View>
        )}

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Categories */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            BY CATEGORY
          </Text>

          {expenseTracker.categories.map((cat, idx) => (
            <View
              key={idx}
              style={[
                styles.categoryRow,
                idx < expenseTracker.categories.length - 1 && {
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.colors.borderSubtle,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryName,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                ]}
              >
                {cat.name}
              </Text>
              <View style={styles.categoryRight}>
                <Text
                  style={[
                    styles.categoryAmount,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold },
                  ]}
                >
                  {cat.formatted}
                </Text>
                <Text style={[styles.categoryPercent, { color: theme.colors.textMuted }]}>
                  {cat.percentage}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Transactions */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            TRANSACTIONS ({expenseTracker.transactions.length})
          </Text>

          {expenseTracker.transactions.map((tx, idx) => (
            <View
              key={tx.id}
              style={[
                styles.txRow,
                idx < expenseTracker.transactions.length - 1 && {
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.colors.borderSubtle,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.txTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansMedium },
                  ]}
                >
                  {tx.title}
                </Text>
                <Text style={[styles.txMeta, { color: theme.colors.textSecondary }]}>
                  {tx.category} · {tx.date}
                </Text>
              </View>

              <Text
                style={[
                  styles.txAmount,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold, marginRight: 14 },
                ]}
              >
                {tx.amount}
              </Text>

              <Pressable
                onPress={() => deleteExpense(tx.id)}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${tx.title}`}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={15} color={theme.colors.textMuted} />
              </Pressable>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  topBudgetSection: {
    marginBottom: 8,
  },
  amountDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  spentAmount: {
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.4,
  },
  budgetAmount: {
    fontSize: 20,
  },
  amountSublabel: {
    fontSize: 12,
    marginTop: 2,
  },
  budgetRightColumn: {
    alignItems: 'flex-end',
  },
  progressTrack: {
    height: 3,
    width: '100%',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  addFormCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 0.5,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
  },
  formInput: {
    height: 46,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 14,
  },
  divider: {
    height: 0.5,
    width: '100%',
    marginVertical: 24,
  },
  sectionOverline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  categoryName: {
    fontSize: 15,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmount: {
    fontSize: 15,
    marginRight: 8,
  },
  categoryPercent: {
    fontSize: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  txTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  txMeta: {
    fontSize: 12,
  },
  txAmount: {
    fontSize: 15,
  },
});
