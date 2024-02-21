import { createStore } from "vuex";

export const getDefaultState = () => ({
    tittle: '',
    status: 'Нет данных',
    project: null,
    clusteredSet: [],
    clusterMethod: null,
    replacementHistory: [],
    wizardStep: '',
    projectName: '',
    textContent: '',
    filename: '',
    specSet: null,
    setupActions: [],
    characteristics: {
        "project_id": "Test",
        "specs": [],
        "templates": {
            "short": [],
            "long": []
        }
    },
    characteristicsSpecsShort: [],
    characteristicsSpecsLong: [],
    projectInfo: {
        createDate: "не создано",
        filename: "не создано",
        InitRowNum: 0,
        finalRowNum: 0,
        setupList: ["не использовано"],
        clusterMehod: "",
        FinalRowNum: 0,
        processTime: "",
        clustersFound: 0
    },
    latestResult: "",
})

// Create a new store instance.
const store = createStore({
    state: getDefaultState(),
    mutations: {
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
        updateTittle(state, payload) {
            state.tittle = payload;
        },
        updateStep(state, payload) {
            state.wizardStep = payload;
        },
        updateProjectName(state, payload) {
            state.projectName = payload;
        },
        updateStatus(state, payload) {
            state.status = payload;
        },
        updateProject(state, payload) {
            state.project = payload;
        },
        updateClusteredSet(state, payload) {
            state.clusteredSet = payload;
        },
        updateClusterMethod(state, payload) {
            state.clusterMethod = payload;
        },
        
        updateReplacementHistory(state, payload) {
            state.replacementHistory = [...state.replacementHistory, payload];
        },
        updateTextContent(state, payload) {
            state.textContent = payload;
        },
        updateFilename(state, payload) {
            state.filename = payload;
        },
        updateSpecSet(state, payload) {
            state.specSet = payload;
        },
        updateSetupActions(state, payload) {
            state.setupActions = payload;
        },
        updateCharacteristics(state, payload) {
            state.characteristics = payload;
        },
        setCharacteristicsSpecsShort(state, payload) {
            state.characteristicsSpecsShort = payload;
        },
        setCharacteristicsSpecsLong(state, payload) {
            state.characteristicsSpecsLong = payload;
        },
        updateCharacteristicsSpecsShort(state, payload) {
            state.characteristicsSpecsShort = [...state.characteristicsSpecsShort, payload];
        },
        updateCharacteristicsSpecsLong(state, payload) {
            state.characteristicsSpecsLong = [...state.characteristicsSpecsLong, payload];
        },
        updateProjectInfo(state, payload,) {
            state.projectInfo = payload;
        },
        clearState(state) {
            Object.assign(state, getDefaultState())
            // state = JSON.parse(JSON.stringify(initStates));
        },
        updateLatestResult(state, payload) {
            state.latestResult = payload;
        },
    },
    actions: {
        setTittle(context, payload) {
            context.commit('updateTittle', payload);
        },
        setStatus(context, payload) {
            context.commit('updateStatus', payload);
        },
        setProject(context, payload) {
            context.commit('setProject', payload);
        },
        setClusteredSet(context, payload) {
            context.commit('updateClusteredSet', payload);
        },
        setClusterMethod(context, payload) {
            context.commit('updateClusterMethod', payload);
        },
        setReplacementRules(context, payload) {
            context.commit('setReplacementRules', payload);
        },
        updateReplacementRules(context, payload) {
            context.commit('updateReplacementRules', payload);
        },
        updateReplacementRule(context, payload) {
            context.commit('updateReplacementRule', payload);
        },
        setCharacteristicsSpecsShort(context, payload) {
            context.commit('setCharacteristicsSpecsShort', payload);
        },
        setCharacteristicsSpecsLong(context, payload) {
            context.commit('setCharacteristicsSpecsLong', payload);
        },
        updateCharacteristicsSpecsShort(context, payload) {
            context.commit('updateCharacteristicsSpecsShort', payload);
        },
        updateCharacteristicsSpecsLong(context, payload) {
            context.commit('updateCharacteristicsSpecsLong', payload);
        },
        deleteReplacementRule(context, payload) {
            context.commit('deleteReplacementRule', payload);
        },
        restoreReplacementRulesSeq(context) {
            context.commit('restoreReplacementRulesSeq');
        },
        updateReplacementHistory(context, payload) {
            context.commit('updateReplacementHistory', payload);
        },
        setStep(context, payload) {
            context.commit('updateStep', payload);
        },
        setProjectName(context, payload) {
            context.commit('updateProjectName', payload);
        },
        setTextContent(context, payload) {
            context.commit('updateTextContent', payload);
        },
        setFilename(context, payload) {
            context.commit('updateFilename', payload);
        },
        setSpecSet(context, payload) {
            context.commit('updateSpecSet', payload);
        },
        setSetupActions(context, payload) {
            context.commit('updateSetupActions', payload);
        },
        setCharacteristics(context, payload) {
            context.commit('updateCharacteristics', payload);
        },
        setProjectInfo(context, payload) {
            context.commit('updateProjectInfo', payload);
        },
        clearStateValues(context) {
            context.commit('clearState');
        },
        setLatestResult(context, payload) {
            context.commit('updateLatestResult', payload);
        },
        setTextContentAndLatestResult(context, payload) {
            context.commit('updateTextContent', payload);
            context.commit('updateLatestResult', payload);
        },
        setClusteredSetAndLatestResult(context, payload) {
            context.commit('updateClusteredSet', payload);
            context.commit('updateLatestResult', payload);
        },
        setSpecSetAndLatestResult(context, payload) {
            context.commit('updateSpecSet', payload);
            context.commit('updateLatestResult', payload);
        },
        setCharacteristicsAndLatestResult(context, payload) {
            context.commit('updateCharacteristics', payload);
            context.commit('updateLatestResult', payload);
        },


    },
    getters: {
        tittle: state => state.tittle,
        status: state => state.status,
        project: state => state.project,
        clusteredSet: state => state.clusteredSet,
        clusterMethod: state => state.clusterMethod,
        replacementHistory: state => { return state.replacementHistory },
        pageStep: state => {
            return state.wizardStep;
        },
        projectName: state => {
            return state.projectName;
        },
        textContent: state => {
            return state.textContent;
        },
        filename: state => {
            return state.filename;
        },
        specSet: state => {
            return state.specSet;
        },
        setupActions: state => {
            return state.setupActions;
        },
        characteristics: state => {
            return state.characteristics;
        },
        characteristicsSpecsShort: state => {
            return state.characteristicsSpecsShort;
        },
        characteristicsSpecsLong: state => {
            return state.characteristicsSpecsLong;
        },
        projectInfo: state => {
            return state.projectInfo;
        },
        latestResult: state => {
            return state.latestResult;
        }
    },
    modules: {},
})

store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});

export default store
