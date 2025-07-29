import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Modal, FlatList, Image, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import NewsNavbar from '../components/newsnavbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 10 : 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  menuButtonText: {
    fontSize: 28,
    color: '#0d47a1',
  },
  modalOverlayNav: {
    flex: 1,
  },
  modalViewNav: {
    width: '85%', // Increased from 75% for better mobile use
    height: '100%',
    backgroundColor: '#fff',
  },
  newsPageScroll: {
    padding: Platform.select({
      web: 24,
      default: 16, // Reduced padding on mobile
    }),
    paddingTop: Platform.select({
      web: 36,
      default: 16, // Reduced top padding on mobile
    }),
    backgroundColor: '#f4f6f8',
  },
  newsMainRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    width: '100%',
    maxWidth: 1300,
    alignSelf: 'center',
    gap: Platform.select({
      web: 32,
      default: 16, // Reduced gap on mobile
    }),
  },
  leftColWrapper: {
    flex: 3,
    minWidth: Platform.select({
      web: 340,
      default: '100%', // Full width on mobile
    }),
    maxWidth: 900,
  },
  latestContentTitle: {
    fontSize: Platform.select({
      web: 22,
      default: 20,
    }),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    marginLeft: 2,
    letterSpacing: 0.2,
    marginTop: Platform.select({
      web: 0,
      default: 16, // Added top margin for mobile
    }),
    paddingTop: Platform.select({
      web: 0,
      default: 8, // Added padding for mobile
    }),
  },
  // Add this new style for the trending card wrapper to adjust its spacing
  trendingCardWrapper: {
    width: '100%',
    maxWidth: 1050,
    marginBottom: Platform.select({
      web: 24,
      default: 16,
    }),
    marginTop: Platform.select({
      web: 0,
      default: 8, // Added top margin for mobile
    }),
  },
  gridContainer: {
    width: '100%',
    maxWidth: 1050,
    alignSelf: 'center',
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  gridRow: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  trendingCard: {
    minHeight: Platform.select({
      web: 260,
      default: 200, // Shorter on mobile
    }),
    borderRadius: 0,
    elevation: 6,
    marginBottom: 0,
  },
  trendingImage: {
    height: Platform.select({
      web: 220,
      default: 160, // Shorter image on mobile
    }),
  },
  trendingContent: {
    padding: Platform.select({
      web: 24,
      default: 16, // Less padding on mobile
    }),
  },
  trendingCategory: {
    fontSize: 14,
    marginBottom: 6,
  },
  trendingTitle: {
    fontSize: Platform.select({
      web: 28,
      default: 22, // Smaller title on mobile
    }),
    lineHeight: Platform.select({
      web: 36,
      default: 28, // Tighter line height
    }),
  },
  gridContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  gridRow: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: Platform.select({
      web: 14,
      default: 8, // Reduced gap between rows
    }),
    gap: Platform.select({
      web: 14,
      default: 8, // Reduced gap between cards
    }),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 0,
    marginBottom: Platform.select({
      web: 14,
      default: 8, // Reduced margin
    }),
    overflow: 'hidden',
    elevation: 2,
    flex: 1,
    minWidth: Platform.select({
      web: 220,
      default: '48%', // Nearly half width on mobile
    }),
    marginHorizontal: Platform.select({
      web: 4,
      default: 0, // No horizontal margin on mobile
    }),
  },
  compactCard: {
    minHeight: Platform.select({
      web: 160,
      default: 140, // Shorter cards on mobile
    }),
  },
  cardImage: {
    width: '100%',
    height: Platform.select({
      web: 110,
      default: 90, // Smaller images on mobile
    }),
  },
  compactImage: {
    height: Platform.select({
      web: 90,
      default: 70, // Even smaller for compact
    }),
  },
  cardContent: {
    padding: Platform.select({
      web: 10,
      default: 8, // Tighter padding
    }),
  },
  cardCategory: {
    fontSize: 12,
    color: '#1769aa',
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  compactCategory: {
    fontSize: 11,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: Platform.select({
      web: 16,
      default: 14, // Smaller text
    }),
    marginBottom: Platform.select({
      web: 2,
      default: 0, // Tighter spacing
    }),
  },
  compactTitle: {
    fontSize: Platform.select({
      web: 14,
      default: 12, // Even smaller for compact
    }),
  },
  headlineCard: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headlineCategory: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  headlineText: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
    marginBottom: 0,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 28,
  },
  cardExcerpt: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  readMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rightCol: {
    flex: 1,
    minWidth: Platform.select({
      web: 220,
      default: '100%', // Full width on mobile
    }),
    marginTop: Platform.select({
      web: 0,
      default: 16, // Added space between columns on mobile
    }),
  },
  freshStoriesSection: {
    marginTop: Platform.select({
      web: 32,
      default: 24, // Reduced margin
    }),
    paddingTop: Platform.select({
      web: 18,
      default: 12, // Less padding
    }),
  },
  freshStoriesHeader: {
    fontSize: Platform.select({
      web: 20,
      default: 18, // Slightly smaller
    }),
  },
  freshStoriesSubheader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 1,
    letterSpacing: 0.1,
  },
  freshStoryList: {
    marginTop: 2,
  },
  freshStoryItem: {
    marginBottom: 6,
  },
  freshStoryTitle: {
    fontSize: Platform.select({
      web: 13,
      default: 12, // Smaller text
    }),
  },
  freshStoryTitleBold: {
    fontSize: Platform.select({
      web: 13,
      default: 12, // Matches regular
    }),
  },
  freshStoryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  freshStoryCategory: {
    fontWeight: 'bold',
    color: '#e53935',
    fontSize: 10,
    marginRight: 4,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  freshStoryDate: {
    fontSize: 10,
    color: '#222',
    fontWeight: '400',
  },
  freshStoryDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    marginVertical: 4,
  }
});

// --- COMPONENT CODE MUST BE BELOW STYLES ---

// Placeholder data for news articles
const newsData = [
  {
    id: '1',
    title: 'New Fishing Regulations Announced for the Summer Season',
    excerpt: 'Authorities have released new guidelines for recreational and commercial fishing to ensure sustainability...',
    image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=2070',
    date: 'July 15, 2024',
    category: 'Nation',
  },
  {
    id: '2',
    title: 'The Annual Fishing Derby Breaks All Records',
    excerpt: 'This year\'s derby saw record participation and a new champion crowned in the heavyweight category...',
    image: 'https://images.unsplash.com/photo-1555815944-43f55a116503?q=80&w=2070',
    date: 'July 12, 2024',
    category: 'Sports',
  },
  {
    id: '3',
    title: 'Tech in Fishing: How GPS and Sonar are Changing the Game',
    excerpt: 'Modern technology is giving anglers an unprecedented edge, from finding the best spots to tracking fish...',
    image: 'https://images.unsplash.com/photo-1553697388-9955731b1c73?q=80&w=2070',
    date: 'July 10, 2024',
    category: 'Tech',
  },
  {
    id: '4',
    title: 'Fishermen Rescue Stranded Dolphins',
    excerpt: 'Local fishermen became heroes after saving a pod of dolphins stranded near the shore...',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
    date: 'July 8, 2024',
    category: 'Environment',
  },
  {
    id: '5',
    title: 'Seafood Prices Drop Amid Bumper Catch',
    excerpt: 'Market prices for seafood have dropped this week as local fishers report record hauls...',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070',
    date: 'July 6, 2024',
    category: 'Business',
  },
  {
    id: '6',
    title: 'Kids Learn to Fish at Summer Camp',
    excerpt: 'A new summer camp is teaching children the basics of fishing and environmental stewardship...',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070',
    date: 'July 4, 2024',
    category: 'Lifestyle',
  },
  {
    id: '7',
    title: 'Local Boat Builder Wins National Award',
    excerpt: 'A craftsman from the coastal village receives recognition for innovative boat designs...',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2070',
    date: 'July 2, 2024',
    category: 'Community',
  },
  {
    id: '8',
    title: 'Rare Fish Species Spotted in River',
    excerpt: 'Biologists are excited after a rare fish species was spotted in the local river for the first time in decades...',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070',
    date: 'June 30, 2024',
    category: 'Science',
  },
  {
    id: '9',
    title: 'Weather Update: Storm Watch Issued for Coastal Areas',
    excerpt: 'Authorities urge residents to prepare as a tropical storm approaches...',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
    date: 'June 28, 2024',
    category: 'Weather',
  },
  {
    id: '10',
    title: 'Fisherfolk Receive New Equipment from NGO',
    excerpt: 'A non-profit organization has distributed modern fishing gear to local communities...',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070',
    date: 'June 26, 2024',
    category: 'Community',
  },
  {
    id: '11',
    title: 'Marine Protected Area Expansion Announced',
    excerpt: 'Government announces new boundaries for marine conservation...',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070',
    date: 'June 24, 2024',
    category: 'Environment',
  },
  {
    id: '12',
    title: 'Fish Market Festival Attracts Tourists',
    excerpt: 'The annual festival draws crowds with fresh seafood and cultural shows...',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
    date: 'June 22, 2024',
    category: 'Events',
  },
  {
    id: '13',
    title: 'Aquaculture Farms See Growth in Exports',
    excerpt: 'Local aquaculture businesses report a surge in overseas demand...',
    image: 'https://images.unsplash.com/photo-1553697388-9955731b1c73?q=80&w=2070',
    date: 'June 20, 2024',
    category: 'Business',
  },
  {
    id: '14',
    title: 'Youth Group Leads Coastal Cleanup',
    excerpt: 'Volunteers collect over 500kg of trash from the shoreline...',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2070',
    date: 'June 18, 2024',
    category: 'Community',
  },
  {
    id: '15',
    title: 'Expert Tips: Sustainable Fishing Practices',
    excerpt: 'Learn how to fish responsibly and protect marine life...',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070',
    date: 'June 16, 2024',
    category: 'Advice',
  },
];

const NewsCard = ({ item, compact, bigTrending }) => (
  <View style={[
    styles.card,
    compact && styles.compactCard,
    bigTrending && styles.trendingCard,
  ]}>
    <Image source={{ uri: item.image }} style={[
      styles.cardImage,
      compact && styles.compactImage,
      bigTrending && styles.trendingImage,
    ]} />
    <View style={[
      styles.cardContent,
      bigTrending && styles.trendingContent,
    ]}>
      <Text style={[
        styles.cardCategory,
        compact && styles.compactCategory,
        bigTrending && styles.trendingCategory,
      ]}>{item.category}</Text>
      <Text
        style={[
          styles.cardTitle,
          compact && styles.compactTitle,
          bigTrending && styles.trendingTitle,
        ]}
        numberOfLines={bigTrending ? 3 : 2}
      >
        {item.title}
      </Text>
    </View>
  </View>
);

const HeadlineCard = ({ item }) => (
  <View style={styles.headlineCard}>
    <Text style={styles.headlineCategory}>{item.category}</Text>
    <Text style={styles.headlineText} numberOfLines={2}>{item.title}</Text>
  </View>
);

export default function NewsScreen() {
  const [navVisible, setNavVisible] = useState(false);
  const trendingStory = newsData[0];
  const gridStories = newsData.slice(1, 10);
  const headlineStories = newsData.slice(10);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'web' ? (
        <>
          <Navbar />
          <NewsNavbar />
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.menuButton} onPress={() => setNavVisible(true)}>
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent
            visible={navVisible}
            onRequestClose={() => setNavVisible(false)}
          >
            <TouchableOpacity style={styles.modalOverlayNav} activeOpacity={1} onPressOut={() => setNavVisible(false)}>
              <View style={styles.modalViewNav}>
                <Navbar onLinkPress={() => setNavVisible(false)} />
                <NewsNavbar />
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      )}
      <ScrollView contentContainerStyle={styles.newsPageScroll}>
        <View style={styles.newsMainRow}>
          <View style={styles.leftColWrapper}>
            <View style={{ marginBottom: Platform.select({ web: 0, default: 8 }) }}>
              <Text style={styles.latestContentTitle}>Latest Content</Text>
            </View>
            <View style={styles.trendingCardWrapper}>
              <NewsCard item={trendingStory} bigTrending />
            </View>
            <FlatList
              data={gridStories}
              renderItem={({ item }) => <NewsCard item={item} compact />}
              keyExtractor={item => item.id}
              numColumns={3}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.gridContainer}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.rightCol}>
            <ScrollView style={styles.rightColScroll} contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={true}>
              {headlineStories.map(item => (
                <HeadlineCard item={item} key={item.id} />
              ))}
              <View style={styles.freshStoriesSection}>
                <Text style={styles.freshStoriesHeader}>Fresh stories</Text>
                <Text style={styles.freshStoriesSubheader}>TODAY: BROWSE OUR EDITOR'S HAND PICKED ARTICLES!</Text>
                <View style={styles.freshStoryList}>
                  <View style={styles.freshStoryItem}>
                    <Text style={styles.freshStoryTitle}><Text style={styles.freshStoryTitleBold}>LITERARY |</Text> gutom na rin ako, kaso pamasaha na lang ang meron ako</Text>
                    <View style={styles.freshStoryMetaRow}>
                      <Text style={styles.freshStoryCategory}>LITERARY</Text>
                      <Text style={styles.freshStoryDate}>  March 21, 2025</Text>
                    </View>
                  </View>
                  <View style={styles.freshStoryDivider} />
                  <View style={styles.freshStoryItem}>
                    <Text style={styles.freshStoryTitle}><Text style={styles.freshStoryTitleBold}>NEWS |</Text> BatStateU, SP strengthen global ties; propose community solutions</Text>
                    <View style={styles.freshStoryMetaRow}>
                      <Text style={styles.freshStoryCategory}>NEWS</Text>
                      <Text style={styles.freshStoryDate}>  March 19, 2025</Text>
                    </View>
                  </View>
                  <View style={styles.freshStoryDivider} />
                  <View style={styles.freshStoryItem}>
                    <Text style={styles.freshStoryTitle}><Text style={styles.freshStoryTitleBold}>EDITORIAL |</Text> Pulling Out the Thorns</Text>
                    <View style={styles.freshStoryMetaRow}>
                      <Text style={styles.freshStoryCategory}>EDITORIAL</Text>
                      <Text style={styles.freshStoryDate}>  March 11, 2025</Text>
                    </View>
                  </View>
                  <View style={styles.freshStoryDivider} />
                  <View style={styles.freshStoryItem}>
                    <Text style={styles.freshStoryTitle}>People Power is not a relic of the past. It is a reminder, a warning, and a call to action.</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
