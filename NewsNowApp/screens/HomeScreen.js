import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import NewsArticleItem from '../components/NewsArticleItem';
import { fetchTopHeadlines } from '../api/NewsApi';
import { NEWS_CATEGORIES } from '../constants/NewsCategories'
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(NEWS_CATEGORIES[0]);


    const loadNews = useCallback(async (category) => {
        try {
            setLoading(true);
            setError(null);
            const newsArticles = await fetchTopHeadlines('us', category)
            if (newsArticles) {
                setArticles(newsArticles);
            }
            else {
                setArticles([]);
                setError("Failed to fetch Articles.");
            }

        } catch (error) {
            console.error(error);
            setError("An unexpected error occured");
            setArticles([]);
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        loadNews(selectedCategory);
    }, [selectedCategory, loadNews]);

    const handleCategoryPress = (category) => {
        if (category !== selectedCategory) {
            setSelectedCategory(category);
        }
    };

    const handleArticlePress = (articleUrl) => {
        console.log("Article Pressed! URL:", articleUrl);
        navigation.navigate('ArticleDetail', { articleUrl });
    };

    const renderArticleItem = ({ item }) => (
        <NewsArticleItem article={item} onPress={handleArticlePress} />
    );

    const keyExtractor = (item, index) => {
        return item.url ? item.url : index.toString();
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading News...</Text>
            </View>
        )
    }


    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error : {error}</Text>
                <TouchableOpacity onPress={() => loadNews(selectedCategory)}> {/* Add a retry button */}
                    <Text style={{ color: 'blue', marginTop: 10 }}>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.categoryContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollView}
                >
                    {NEWS_CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton
                            ]}
                            onPress={() => handleCategoryPress(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryButtonText
                                ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {error && articles.length > 0 && (
                <View style={styles.inlineErrorContainer}>
                    <Text style={styles.inlineErrorText}>Error fetching updates: {error}</Text>
                </View>
            )}

            <FlatList
                data={articles}
                renderItem={renderArticleItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListText}>No news articles found.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )

}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    categoryContainer: {
        paddingVertical: 10,
        backgroundColor: '#f0f0f0', // Background for the category bar
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    categoryScrollView: {
        paddingHorizontal: 10, // Add padding on sides of the scroll view content
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 10, // Space between buttons
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#007bff', // Highlight color for selected button
    },
    categoryButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryButtonText: {
        color: '#fff', // Text color for selected button
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyListText: {
        fontSize: 18,
        color: '#555',
    },
})