import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { format } from 'date-fns';

// Function to Truncate Text
const truncateText = (text, maxLines) => {
    if (!text) {
        return '';
    }

    const lines = text.split('\n');

    if (lines <= maxLines) {
        return text;
    }

    const truncatedLines = lines.slice(0, maxLines);
    return truncatedLines.join('\n') + '...';
}

const NewsArticleItem = ({ article, onPress }) => {

    const sourceName = article.source?.name || 'Unknown Source';
    const authorName = article.author || 'Unknown Author';
    const title = article.title || 'No Title Available';
    const subtitle = article.description || '';
    const imageUrl = article.urlToImage;
    const publishedDate = article.publishedAt;

    //Formate Date

    let formattedDate = 'Date Not Available';

    if (publishedDate) {
        try {

            formattedDate = format(new Date(publishedDate), 'MM/dd/yyyy');
            // If you had a formatter in utils:
            // formattedDate = formatDate(publishedDate);
        } catch (e) {
            console.error("Failed to format date:", publishedDate, e);
            formattedDate = 'Invalid Date';
        }
    }

    const truncatedSubtitle = truncateText(subtitle, 2);

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(article.url)}>
            {
                imageUrl ?
                    (
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )
                    :
                    (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>No Image Found</Text>
                        </View>
                    )
            }

            <View style={styles.textContainer}>
                <Text style={styles.sourceAndAuthor}>
                    {sourceName} {authorName !== 'Unknown Author' ? `• ${authorName}` : ''}
                </Text>
                <Text style={styles.title}>{title}</Text>
                {
                    truncatedSubtitle ?
                        (
                            <Text style={styles.subtitle}>{truncatedSubtitle}</Text>
                        )
                        : null
                }

                <Text style={styles.date}>{formattedDate}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default NewsArticleItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange items horizontally
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    image: {
        width: 100, // Fixed width for the image
        height: 100, // Fixed height for the image
        borderRadius: 5,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#666',
        fontSize: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    sourceAndAuthor: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#777',
    },
})