import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';

const ThresholdViewer = ({ open, onClose, onSentencesUpdate}) => {
    const { shipId, containerId } = useParams();
    const [thresholds, setThresholds] = useState([]); // Correct state definition
    const [thresholdSentences, setThresholdSentences] = useState([]); // Correct state definition

    // Fetch all thresholds
    useEffect(() => {
        const fetchThresholdsOfContainer = async () => {
            try {
                const threshHoldsResponse = await axiosInstance.get(`/rest/container/${containerId}/thresholds`);

                const fetchedThresholds = threshHoldsResponse.data?.thresholds || [];
                if (!Array.isArray(fetchedThresholds)) {
                    console.error("Fetched data is not an array:", fetchedThresholds);
                    return;
                }

                setThresholds(fetchedThresholds);
            } catch (error) {
                console.error("Failed to fetch thresholds of container:", error.message);
            }
        };
        fetchThresholdsOfContainer();
    }, [containerId]);

    // Fetch additional data and create sentences
    useEffect(() => {
        const fetchAdditionalData = async () => {
            const validThresholds = Array.isArray(thresholds) ? thresholds : [];
            const sentences = [];

            if (validThresholds.length > 0) {
                try {
                    for (let i = 0; i < validThresholds.length; i++) {
                        // Parameter
                        const parameterId = validThresholds[i].parameter;
                        const parameterResponse = await axiosInstance.get(`/rest/threshold/parameter/${parameterId}`);
                        const parameterValue = parameterResponse.data.parameter[0].name;

                        // Rule
                        const ruleId = validThresholds[i].rule;
                        const ruleResponse = await axiosInstance.get(`/rest/threshold/rule/${ruleId}`);
                        const ruleValue = ruleResponse.data.rule[0].name;

                        // Level
                        const levelId = validThresholds[i].level;
                        const levelResponse = await axiosInstance.get(`/rest/threshold/level/${levelId}`);
                        const levelValue = levelResponse.data.level[0].name;

                        // Sentence
                        const sentence = `${parameterValue} ${ruleValue} ${validThresholds[i].value} = ${levelValue}`;
                        sentences.push(sentence);
                    }

                    setThresholdSentences(sentences);
                    onSentencesUpdate(sentences); // So that the DetailPage can pass it to the Detailspace!
                } catch (error) {
                    console.error("Error fetching additional data:", error.message);
                }
            }
        };

        fetchAdditionalData();
    }, [thresholds]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Thresholds</h2>
                <ul className="space-y-2">
                    {thresholdSentences.length > 0 ? (
                        thresholdSentences.map((sentence, index) => (                
                            <li key={index} className="text-black">
                                {sentence}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No sentences available.</li>
                    )}
                </ul>

                <button
                    className="mt-4 w-full border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ThresholdViewer;
