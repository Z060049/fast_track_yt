import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText} pointerEvents="none">16 hours</Text>
          <TouchableOpacity onPress={() => setShowGoalModal(true)}>
            <Text style={styles.editGoalLabel}>Edit goal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start/End Fasting button */}
      <TouchableOpacity
        style={[styles.fastingButton, isFasting ? styles.endButton : styles.startButton]}
        onPress={() => setIsFasting(!isFasting)}
      >
        <Text style={styles.fastingButtonText}>{isFasting ? 'End Fasting' : 'Start Fasting'}</Text>
      </TouchableOpacity>

      {/* Goal Modal */}
      <Modal
        visible={showGoalModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGoalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change fast goal</Text>
              <TouchableOpacity onPress={() => setShowGoalModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalsGrid}>
              <View style={[styles.goalCard, { backgroundColor: '#7c3aed' }]}> 
                <Text style={styles.goalLabel}>Circadian{"\n"}Rhythm TRF</Text>
                <Text style={styles.goalHours}>13 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
              <View style={[styles.goalCard, { backgroundColor: '#f43f5e' }]}> 
                <Text style={styles.goalLabel}>16:8{"\n"}TRF</Text>
                <Text style={styles.goalHours}>16 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
              <View style={[styles.goalCard, { backgroundColor: '#15803d' }]}> 
                <Text style={styles.goalLabel}>18:6{"\n"}TRF</Text>
                <Text style={styles.goalHours}>18 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
              <View style={[styles.goalCard, { backgroundColor: '#f59e42' }]}> 
                <Text style={styles.goalLabel}>20:4{"\n"}TRF</Text>
                <Text style={styles.goalHours}>20 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
              <View style={[styles.goalCard, { backgroundColor: '#2563eb' }]}> 
                <Text style={styles.goalLabel}>36-Hour{"\n"}Fast</Text>
                <Text style={styles.goalHours}>36 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
              <View style={[styles.goalCard, { backgroundColor: '#6b7280' }]}> 
                <Text style={styles.goalLabel}>Custom{"\n"}Fast</Text>
                <Text style={styles.goalHours}>1-168 <Text style={styles.goalHoursUnit}>hours</Text></Text>
                <Text style={styles.infoIcon}>i</Text>
              </View>
            </View>
            <Text style={styles.presetsTitle}>Your Presets <Text style={styles.zeroPlus}>Zero+</Text></Text>
            <View style={styles.presetCard}><Text style={styles.plusSign}>+</Text></View>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 28,
    color: '#888',
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  goalCard: {
    width: '30%',
    aspectRatio: 0.8,
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  goalLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  goalHours: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  goalHoursUnit: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  infoIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: '#fff',
    fontSize: 18,
    opacity: 0.8,
  },
  presetsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  zeroPlus: {
    backgroundColor: '#f43f5e',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginLeft: 4,
  },
  presetCard: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  plusSign: {
    fontSize: 36,
    color: '#888',
    fontWeight: 'bold',
  },
});
