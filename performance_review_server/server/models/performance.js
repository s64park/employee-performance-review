/**
 * Created by Terry on 2016-12-14.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/*
    summary of Performance:             Performance Deifinition:
    O   Outstanding                     Performance is superior on a consistent and sustained basis
    E   Exceeds Expectation             Performance exceeds normal job requirements
    M   Meets Expectations              Performance meets position requirements
    NI  Needs Improvement               Performance meets some position requirements, objectives and expectations
    U   Unsatisfactory                  Performance does not meet position requirements, objectives, and expectations.
                                        Immediate attention to improvement is required
    NA  Not Applicable                  Criterion does not apply to this position
 */

const performanceSchema = new Schema({
    employeeId: mongoose.Schema.Types.ObjectId,
    qualityOfWork: String,  //"O", "E", "M", "NI", "U", "NA"
    quantityOfWork: String,     //"O", "E", "M", "NI", "U", "NA"
    individualEffectiveness: String,
    communication: String,
    serviceFocus: String,
    judgementAndDecisionMaking: String,
    teamBuilding: String,
    initiative: String,
    ongoingSkillsImprovement: String,
    dependability: String,
    safeWorkPractice: String,
    attendanceAndPuntuality: String,
    overall: String,  // BE, ME, US
    employerComments: String,
    submitted: { type: Boolean, default: false },
    feedbacks: { type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'feedback' }], default: [] }

}, {
    timestamps: true
});

export default mongoose.model('performanceReview', performanceSchema);