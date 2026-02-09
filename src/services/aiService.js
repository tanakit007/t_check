/**
 * AI Service for communicating with OpenAI-compatible APIs (like Typhoon v1.5)
 */

const getSettings = () => {
    let baseUrl = localStorage.getItem('ai_base_url') || 'https://api.opentyphoon.ai/v1';

    // Sanitize URL: Remove trailing slashes and common accidental suffixes
    baseUrl = baseUrl.replace(/\/+$/, '');
    baseUrl = baseUrl.replace(/\/chat\/completions$/, '');
    baseUrl = baseUrl.replace(/\/completions$/, ''); // Remove accidental /completions
    baseUrl = baseUrl.replace(/\/v1\/v1$/, '/v1'); // Fix double v1/v1 if present

    return {
        apiKey: localStorage.getItem('ai_api_key') || '',
        baseUrl: baseUrl,
        model: localStorage.getItem('ai_model') || 'typhoon-v1.5-instruct'
    };
};

export const checkGrammar = async (text, language = 'en') => {
    const { apiKey, baseUrl, model } = getSettings();
    // Allow empty API key if using localhost (common for LM Studio)
    if (!apiKey && !baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
        throw new Error('API Key is missing. Please check Settings.');
    }

    const prompt = language === 'th'
        ? `คุณเป็นผู้ช่วยตรวจทานไวยากรณ์ภาษาไทย แก้ไขข้อความต่อไปนี้ให้ถูกต้องตามหลักภาษาและเป็นธรรมชาติ โดยรักษาความหมายเดิมไว้: "${text}" ตอบกลับเฉพาะข้อความที่แก้ไขแล้วเท่านั้น`
        : `You are a helpful grammar assistant. Correct the grammar of the following text to be standard and natural, keeping the original meaning: "${text}". Reply ONLY with the corrected text.`;

    try {
        const url = `${baseUrl}/chat/completions`;
        console.log('Connecting to AI at:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();

        // Safety check for expected response structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected API Response:', data);
            throw new Error('Invalid response from AI model. Please check the logs.');
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
    }
};

export const humanizeText = async (text, voice, language = 'en') => {
    const { apiKey, baseUrl, model } = getSettings();
    if (!apiKey && !baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
        throw new Error('API Key is missing. Please check Settings.');
    }

    const prompt = language === 'th'
        ? `เขียนข้อความต่อไปนี้ใหม่ให้มีน้ำเสียงแบบ "${voice}" โดยยังคงความหมายเดิมไว้ ข้อความ: "${text}" ตอบกลับเฉพาะข้อความที่เขียนใหม่เท่านั้น`
        : `Rewrite the following text to sound like a "${voice}" persona. Keep the meaning but change the tone and vocabulary to match the persona. Text: "${text}". Reply ONLY with the rewritten text.`;

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
            })
        });

        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();

        // Safety check
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected API Response:', data);
            throw new Error('Invalid response from AI model. Please check the logs.');
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
    }
};

export const paraphraseText = async (text, style, language = 'en') => {
    const { apiKey, baseUrl, model } = getSettings();
    if (!apiKey && !baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
        throw new Error('API Key is missing. Please check Settings.');
    }

    const prompt = language === 'th'
        ? `ปรับสำนวนข้อความต่อไปนี้ให้อยู่ในสไตล์ "${style}" ข้อความ: "${text}" ตอบกลับเฉพาะข้อความที่ปรับสำนวนแล้วเท่านั้น`
        : `Paraphrase the following text in a "${style}" style. Text: "${text}". Reply ONLY with the paraphrased text.`;

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
            })
        });

        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();

        // Safety check
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected API Response:', data);
            throw new Error('Invalid response from AI model. Please check the logs.');
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
    }
};
