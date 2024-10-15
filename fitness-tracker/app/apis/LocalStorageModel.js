import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LocalStorageModel
 *
 * This class provides methods to interact with local storage using AsyncStorage.
 * It includes storing, retrieving, merging, clearing, and removing items from storage.
 */
export class LocalStorageModel {
    /**
     * Stores a value in AsyncStorage under the provided key.
     * @param {string} key - The key under which the data will be stored.
     * @param {any} value - The value to be stored (will be stringified if not a string).
     * @returns {Promise<void>} - Resolves when the data is stored.
     */
    async storeData(key, value) {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            await AsyncStorage.setItem(key, stringValue);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    /**
     * Retrieves a value from AsyncStorage by the provided key.
     * @param {string} key - The key under which the data is stored.
     * @returns {Promise<any|null>} - Resolves with the stored value (parsed if it's JSON) or null if not found.
     */
    async retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? (this._isJson(value) ? JSON.parse(value) : value) : null;
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    }

    /**
     * Merges a value with the existing stored value under the provided key.
     * @param {string} key - The key under which the data is stored.
     * @param {any} newValue - The new value to be merged.
     * @returns {Promise<void>} - Resolves when the data is merged.
     */
    async mergeItems(key, newValue) {
        try {
            const stringValue = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
            await AsyncStorage.mergeItem(key, stringValue);
        } catch (error) {
            console.error('Error merging data:', error);
        }
    }

    /**
     * Clears all data from AsyncStorage.
     * @returns {Promise<void>} - Resolves when storage is cleared.
     */
    async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    }

    /**
     * Removes a specific item from AsyncStorage by the provided key.
     * @param {string} key - The key under which the data is stored.
     * @returns {Promise<void>} - Resolves when the item is removed.
     */
    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    /**
     * Helper method to check if a string is in valid JSON format.
     * @param {string} value - The string to check.
     * @returns {boolean} - True if the string is valid JSON, false otherwise.
     */
    _isJson(value) {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default LocalStorageModel;
