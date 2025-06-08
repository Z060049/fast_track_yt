import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const FAST_GOALS = [13, 16, 18, 20, 36];

function getTodayIndex() {
  return new Date().getDay();
}

export default function HomeScreen() {
  const [isFasting, setIsFasting] = useState(false);
  const [fastStart, setFastStart] = useState(null);
  const [fastGoal, setFastGoal] = useState(13);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [fastedDays, setFastedDays] = useState([getTodayIndex()]); // Example: today is fasted

  // Placeholder for progress (0-1)
  const progress = isFasting ? 0.5 : 0; // TODO: calculate real progress

  return (
    <View style={styles.container}>
      {/* 7-day week view */}
      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day, idx) => (
          <View key={day} style={styles.weekDayContainer}>
            <Text style={[styles.weekDay, fastedDays.includes(idx) && styles.fastedDay]}>{day}</Text>
            <View
              style={[styles.dayCircle, fastedDays.includes(idx) ? styles.fastedDayCircle : styles.nonFastedDayCircle]}
            />
          </View>
        ))}
      </View>

      {/* Circular progress bar (Zero style, larger and thicker) */}
      <View style={styles.progressContainer}>
        <Svg width={308} height={308}>
          {/* Outer background ring */}
          <Circle
            cx={154}
            cy={154}
            r={124}
            stroke="#ececec"
            strokeWidth={54}
            fill="none"
          />
          {/* Progress ring (optional, can be 0 for now) */}
          <Circle
            cx={154}
            cy={154}
            r={124}
            stroke="#b0003a"
            strokeWidth={54}
            fill="none"
            strokeDasharray={2 * Math.PI * 124}
            strokeDashoffset={2 * Math.PI * 124}
            strokeLinecap="round"
            rotation="-90"
            origin="154,154"
          />
          {/* Inner thin circle (centered in border, more visible color) */}
          <Circle
            cx={154}
            cy={154}
            r={124}
            stroke="#d1cfd4"
            strokeWidth={1.5}
            fill="none"
          />
        </Svg>
        <View style={styles.progressTextContainer} pointerEvents="none">
          <Text style={styles.progressText}>16 hours</Text>
          <Text style={styles.editGoalLabel}>Edit goal</Text>
        </View>
      </View>

      {/* Start/End Fasting button */}
      <TouchableOpacity
        style={[styles.fastingButton, isFasting ? styles.endButton : styles.startButton]}
        onPress={() => setIsFasting(!isFasting)}
      >
        <Text style={styles.fastingButtonText}>{isFasting ? 'End Fasting' : 'Start Fasting'}</Text>
      </TouchableOpacity>

      {/* Edit Goal button */}
      <TouchableOpacity style={styles.editGoalButton} onPress={() => setShowGoalModal(true)}>
        <Text style={styles.editGoalText}>Edit Goal</Text>
      </TouchableOpacity>

      {/* Goal Modal */}
      <Modal visible={showGoalModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change fast goal</Text>
            <FlatList
              data={FAST_GOALS}
              keyExtractor={item => item.toString()}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.goalOption, fastGoal === item && styles.selectedGoal]}
                  onPress={() => { setFastGoal(item); setShowGoalModal(false); }}
                >
                  <Text style={styles.goalText}>{item} hours</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowGoalModal(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf7fa', alignItems: 'center', paddingTop: 40 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 24, marginTop: 16 },
  weekDayContainer: { flex: 1, alignItems: 'center' },
  weekDay: { fontSize: 16, color: '#888', fontWeight: '600' },
  fastedDay: { color: '#b0003a', fontWeight: 'bold' },
  dayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 5,
    backgroundColor: 'transparent',
  },
  fastedDayCircle: {
    borderColor: '#b0003a',
  },
  nonFastedDayCircle: {
    borderColor: '#ede9ee',
  },
  progressContainer: {
    width: 352,
    height: 352,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 64,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 352,
    height: 352,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: { fontSize: 36, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 8 },
  editGoalLabel: { color: '#b0003a', fontWeight: 'bold', fontSize: 18, letterSpacing: 1 },
  fastingButton: { width: '80%', padding: 16, borderRadius: 32, alignItems: 'center', marginVertical: 16 },
  startButton: { backgroundColor: '#b0003a' },
  endButton: { backgroundColor: '#888' },
  fastingButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  editGoalButton: { marginTop: 8, padding: 8 },
  editGoalText: { color: '#b0003a', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  goalOption: { padding: 16, margin: 8, borderRadius: 12, backgroundColor: '#eee' },
  selectedGoal: { backgroundColor: '#b0003a' },
  goalText: { fontSize: 18, color: '#222' },
  closeModal: { marginTop: 16, color: '#b0003a', fontWeight: 'bold', fontSize: 16 },
});
