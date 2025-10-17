using UnityEngine;
using System.Collections.Generic;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Converts text input into sign language sequences
    /// Uses NLP processing and grammar rules specific to sign languages
    /// </summary>
    public class SignLanguageGenerator : MonoBehaviour
    {
        [Header("Settings")]
        public bool useASLGrammar = true;
        public bool useBSLGrammar = false;
        
        [Header("References")]
        public SignLanguageAvatar avatar;
        
        // Common sign mappings
        private Dictionary<string, string> wordToSignMap;
        
        // ASL/BSL grammar rules
        private Dictionary<string, List<string>> grammarRules;
        
        void Start()
        {
            InitializeWordToSignMap();
            InitializeGrammarRules();
            
            if (avatar == null)
            {
                avatar = FindObjectOfType<SignLanguageAvatar>();
            }
        }
        
        /// <summary>
        /// Convert text to sign sequence
        /// </summary>
        public List<string> TextToSignSequence(string inputText)
        {
            if (string.IsNullOrWhiteSpace(inputText))
            {
                return new List<string>();
            }
            
            // Preprocess text
            inputText = PreprocessText(inputText);
            
            // Tokenize into words
            string[] words = inputText.Split(' ');
            
            // Convert to sign glosses
            List<string> signSequence = new List<string>();
            
            foreach (string word in words)
            {
                if (string.IsNullOrWhiteSpace(word)) continue;
                
                // Check for direct mapping
                if (wordToSignMap.ContainsKey(word.ToLower()))
                {
                    string signGloss = wordToSignMap[word.ToLower()];
                    signSequence.Add(signGloss);
                }
                else
                {
                    // Fingerspell unknown words
                    signSequence.AddRange(FingerspellWord(word));
                }
            }
            
            // Apply sign language grammar rules
            signSequence = ApplyGrammarRules(signSequence);
            
            return signSequence;
        }
        
        /// <summary>
        /// Generate and play signs from text
        /// </summary>
        public void GenerateAndPlaySigns(string inputText)
        {
            List<string> signSequence = TextToSignSequence(inputText);
            
            if (signSequence.Count > 0 && avatar != null)
            {
                avatar.QueueSignSequence(signSequence);
                Debug.Log($"Generated {signSequence.Count} signs from text: {inputText}");
            }
        }
        
        /// <summary>
        /// Preprocess text for sign language conversion
        /// </summary>
        private string PreprocessText(string text)
        {
            // Remove punctuation
            text = System.Text.RegularExpressions.Regex.Replace(text, @"[^\w\s]", "");
            
            // Convert to lowercase
            text = text.ToLower();
            
            // Trim whitespace
            text = text.Trim();
            
            return text;
        }
        
        /// <summary>
        /// Fingerspell a word letter by letter
        /// </summary>
        private List<string> FingerspellWord(string word)
        {
            List<string> letters = new List<string>();
            
            foreach (char c in word.ToUpper())
            {
                if (char.IsLetter(c))
                {
                    letters.Add($"LETTER_{c}");
                }
            }
            
            return letters;
        }
        
        /// <summary>
        /// Apply sign language grammar rules
        /// </summary>
        private List<string> ApplyGrammarRules(List<string> signSequence)
        {
            if (!useASLGrammar && !useBSLGrammar)
            {
                return signSequence;
            }
            
            List<string> processedSequence = new List<string>(signSequence);
            
            // Example: Time-topic-comment structure in ASL
            // Questions typically have non-manual markers (facial expressions)
            // This is a simplified implementation
            
            return processedSequence;
        }
        
        /// <summary>
        /// Initialize word to sign mappings
        /// </summary>
        private void InitializeWordToSignMap()
        {
            wordToSignMap = new Dictionary<string, string>
            {
                // Common words
                { "hello", "HELLO" },
                { "goodbye", "GOODBYE" },
                { "thank", "THANK" },
                { "you", "YOU" },
                { "please", "PLEASE" },
                { "yes", "YES" },
                { "no", "NO" },
                { "help", "HELP" },
                { "water", "WATER" },
                { "eat", "EAT" },
                { "drink", "DRINK" },
                { "sleep", "SLEEP" },
                { "home", "HOME" },
                { "school", "SCHOOL" },
                { "work", "WORK" },
                { "family", "FAMILY" },
                { "friend", "FRIEND" },
                { "love", "LOVE" },
                { "happy", "HAPPY" },
                { "sad", "SAD" },
                
                // Question words
                { "what", "WHAT" },
                { "where", "WHERE" },
                { "when", "WHEN" },
                { "who", "WHO" },
                { "why", "WHY" },
                { "how", "HOW" },
                
                // Numbers (0-10)
                { "zero", "NUM_0" },
                { "one", "NUM_1" },
                { "two", "NUM_2" },
                { "three", "NUM_3" },
                { "four", "NUM_4" },
                { "five", "NUM_5" },
                { "six", "NUM_6" },
                { "seven", "NUM_7" },
                { "eight", "NUM_8" },
                { "nine", "NUM_9" },
                { "ten", "NUM_10" },
            };
        }
        
        /// <summary>
        /// Initialize grammar rules
        /// </summary>
        private void InitializeGrammarRules()
        {
            grammarRules = new Dictionary<string, List<string>>();
            
            // Add grammar rules for different constructions
            // This is a placeholder for more complex grammar processing
        }
        
        /// <summary>
        /// Get statistics about the generator
        /// </summary>
        public int GetVocabularySize()
        {
            return wordToSignMap.Count;
        }
    }
}
