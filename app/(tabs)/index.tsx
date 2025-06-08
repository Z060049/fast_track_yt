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
          </View>
        ))}
      </View>

      {/* Circular progress bar (Zero style) */}
      <View style={styles.progressContainer}>
        <Svg width={240} height={240}>
          {/* Outer background ring */}
          <Circle
            cx={120}
            cy={120}
            r={110}
            stroke="#ececec"
            strokeWidth={18}
            fill="none"
          />
          {/* Progress ring */}
          <Circle
            cx={120}
            cy={120}
            r={110}
            stroke="#b0003a"
            strokeWidth={18}
            fill="none"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 110}
            strokeLinecap="round"
            rotation="-90"
            origin="120,120"
          />
        </Svg>
        <View style={styles.progressTextContainer} pointerEvents="none">
          <Text style={styles.sinceText}>SINCE LAST FAST</Text>
          <Text style={styles.progressText}>{isFasting ? `${progress * fastGoal}` : `0`}<Text style={styles.unitText}>h</Text></Text>
          <Text style={styles.editGoalLabel}>EDIT {fastGoal}H GOAL</Text>
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
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 24 },
  weekDayContainer: { flex: 1, alignItems: 'center' },
  weekDay: { fontSize: 16, color: '#888', fontWeight: '600' },
  fastedDay: { color: '#b0003a', fontWeight: 'bold' },
  progressContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 24, marginTop: 32 },
  progressTextContainer: { position: 'absolute', top: 0, left: 0, width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  sinceText: { color: '#888', fontSize: 14, letterSpacing: 1, marginBottom: 2 },
  progressText: { fontSize: 48, fontWeight: 'bold', color: '#222', textAlign: 'center' },
  unitText: { fontSize: 24, color: '#222', fontWeight: 'bold' },
  editGoalLabel: { color: '#b0003a', fontWeight: 'bold', fontSize: 15, marginTop: 2, letterSpacing: 1 },
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
