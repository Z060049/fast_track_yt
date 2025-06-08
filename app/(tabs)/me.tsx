import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const USER_NAME = 'Monkey S';
const TOTAL_FASTS = 2;
const LONGEST_STREAK = 1;
const ACHIEVEMENTS = [2, 1]; // Placeholder

function getMonthDays(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function MeScreen() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getMonthDays(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  // Example: fasted on 1st and today
  const fastedDays = [1, today.getDate()];

  // Build calendar grid (6 rows x 7 cols)
  const calendar = [];
  let dayIdx = 0;
  for (let row = 0; row < 6; row++) {
    const week = [];
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < firstDayOfWeek) || dayIdx >= days.length) {
        week.push(null);
      } else {
        week.push(days[dayIdx].getDate());
        dayIdx++;
      }
    }
    calendar.push(week);
  }

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>{USER_NAME}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total fasts</Text>
            <Text style={styles.statValue}>{TOTAL_FASTS}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Achievements</Text>
            <View style={styles.achievementsRow}>
              {ACHIEVEMENTS.map((a, i) => (
                <View key={i} style={styles.achievementCircle}><Text style={styles.achievementText}>{a}</Text></View>
              ))}
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Longest streak</Text>
            <Text style={styles.statValue}>{LONGEST_STREAK}</Text>
          </View>
        </View>
      </View>

      {/* Calendar section */}
      <View style={styles.calendarSection}>
        <Text style={styles.calendarTitle}>Calendar</Text>
        <View style={styles.calendarGrid}>
          {/* Weekday headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <Text key={i} style={[styles.calendarCell, styles.calendarHeader]}>{d}</Text>
          ))}
          {/* Calendar days */}
          {calendar.flat().map((date, idx) => (
            <View key={idx} style={styles.calendarCell}>
              {date ? (
                <View style={[styles.dayCircle, fastedDays.includes(date) && styles.fastedDayCircle]}>
                  <Text style={[styles.dayText, fastedDays.includes(date) && styles.fastedDayText]}>{date}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf7fa', paddingTop: 32 },
  profileSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd', marginBottom: 8 },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 8 },
  statBox: { alignItems: 'center', flex: 1 },
  statLabel: { color: '#888', fontSize: 14 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  achievementsRow: { flexDirection: 'row', marginTop: 4 },
  achievementCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#b0003a', alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 },
  achievementText: { color: '#fff', fontWeight: 'bold' },
  calendarSection: { flex: 1, alignItems: 'center' },
  calendarTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 308 },
  calendarCell: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  calendarHeader: { fontWeight: 'bold', color: '#888' },
  dayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  fastedDayCircle: { backgroundColor: '#b0003a' },
  dayText: { fontSize: 16, color: '#222' },
  fastedDayText: { color: '#fff', fontWeight: 'bold' },
}); 