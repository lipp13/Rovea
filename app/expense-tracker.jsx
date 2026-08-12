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
      {/* Top Header Bar */}
      <View style={[styles.headerNav, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifSemiBold }]}>
          Trip Expenses
        </Text>
        <Pressable
          onPress={() => setShowAddForm(!showAddForm)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Plus size={22} color={theme.colors.accentBrand} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Top Spend / Budget Header (Typography & Whitespace) */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.topBudgetSection}>
          <Text style={[styles.overlineTag, { color: theme.colors.accentBrand }]}>
            TRIP BUDGET TRACKER
          </Text>

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
                  { color: theme.colors.textSecondary, fontFamily: theme.fonts.serifMedium },
                ]}
              >
                {expenseTracker.budgetFormatted}
              </Text>
              <Text style={[styles.amountSublabel, { color: theme.colors.textMuted }]}>
                budget limit ({expenseTracker.currency}{remainingBudget.toLocaleString()} left)
              </Text>
            </View>
          </View>

          {/* Subtle Hairline Progress Bar */}
          <View style={[styles.progressTrack, { backgroundColor: theme.colors.bgSubtle }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressRatio * 100}%`,
                  backgroundColor: theme.colors.accentBrand,
                },
              ]}
            />
          </View>
        </Animated.View>

        {/* Inline Add Expense Form if Toggled */}
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
              Log New Expense
            </Text>

            {formError !== '' && (
              <View style={styles.errorBox}>
                <AlertCircle size={14} color={theme.colors.accentBrand} style={{ marginRight: 6 }} />
                <Text style={[styles.errorText, { color: theme.colors.accentBrand }]}>
                  {formError}
                </Text>
              </View>
            )}

            <TextInput
              value={expenseTitle}
              onChangeText={setExpenseTitle}
              placeholder="Expense title (e.g. Ramen Lunch)"
              placeholderTextColor={theme.colors.textMuted}
              style={[
                styles.formInput,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.borderSubtle,
                  backgroundColor: theme.colors.bgSubtle,
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
                },
              ]}
            />

            <Button
              title="Save Expense"
              onPress={handleAddExpenseSubmit}
              variant="primary"
              style={{ marginTop: 8 }}
            />
          </Animated.View>
        )}

        {/* Subtle Hairline Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Category Breakdown Section (Typography & Spacing) */}
        <Animated.View entering={FadeInDown.duration(400).delay(150)}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            DYNAMIC CATEGORY BREAKDOWN
          </Text>

          <View style={styles.categoryList}>
            {expenseTracker.categories.map((cat, idx) => (
              <View
                key={idx}
                style={[
                  styles.categoryRow,
                  { borderBottomColor: theme.colors.borderSubtle },
                ]}
              >
                <Text
                  style={[
                    styles.categoryName,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
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
                  <Text style={[styles.categoryPercent, { color: theme.colors.textSecondary }]}>
                    ({cat.percentage})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Subtle Hairline Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />

        {/* Recent Transactions List */}
        <Animated.View entering={FadeInDown.duration(400).delay(300)}>
          <Text style={[styles.sectionOverline, { color: theme.colors.accentBrand }]}>
            TRANSACTION LOGS ({expenseTracker.transactions.length})
          </Text>

          {expenseTracker.transactions.map((tx) => (
            <View
              key={tx.id}
              style={[
                styles.txRow,
                { borderBottomColor: theme.colors.borderSubtle },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.txTitle,
                    { color: theme.colors.textPrimary, fontFamily: theme.fonts.serifMedium },
                  ]}
                >
                  {tx.title}
                </Text>
                <Text style={[styles.txMeta, { color: theme.colors.textSecondary }]}>
                  {tx.category} • {tx.date}
                </Text>
              </View>

              <Text
                style={[
                  styles.txAmount,
                  { color: theme.colors.textPrimary, fontFamily: theme.fonts.sansSemiBold, marginRight: 12 },
                ]}
              >
                {tx.amount}
              </Text>

              <Pressable
                onPress={() => deleteExpense(tx.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={16} color={theme.colors.textMuted} />
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  topBudgetSection: {
    marginBottom: 8,
  },
  overlineTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  amountDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justify: 'space-between',
    marginBottom: 16,
  },
  spentAmount: {
    fontSize: 38,
    lineHeight: 44,
  },
  budgetAmount: {
    fontSize: 22,
  },
  amountSublabel: {
    fontSize: 12,
    marginTop: 2,
  },
  budgetRightColumn: {
    alignItems: 'flex-end',
  },
  progressTrack: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  addFormCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 16,
  },
  formTitle: {
    fontSize: 16,
    marginBottom: 10,
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
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  sectionOverline: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  categoryList: {
    gap: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryName: {
    fontSize: 16,
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
    justify: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
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
