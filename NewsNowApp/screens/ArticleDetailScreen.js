import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview';

const ArticleDetailScreen = ({ route }) => {

    const { articleUrl } = route.params;

    const [loading, setLoading] = useState(true);

    if (!articleUrl) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text>Error: Article URL not provided.</Text>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {loading &&
                (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        style={styles.loadingIndicator}
                    />
                )
            }

            <WebView
                source={{ uri: articleUrl }}
                style={styles.webview}
                onLoadEnd={() => setLoading(false)}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                }}
            />
        </SafeAreaView>
    )
}

export default ArticleDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 45
    },
    webview: {
        flex: 1
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})