import React, { useState } from "react"
import { Image, Pressable, Platform } from "react-native"
import { YStack, XStack, Text } from "tamagui"
import { MaterialIcons } from "@expo/vector-icons"

type PropertyCardProps = {
  id: string
  name: string
  price: number
  image: string
  availability: string
  description: string
  propertyType: string
  rooms: number
  bathrooms: number
  distanceFromUniversity: number
}

export default function PropertyCard({
  item,
  isWeb,
  onPress,
}: {
  item: PropertyCardProps
  isWeb: boolean
  onPress?: () => void
}) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={{
        transform: [{ scale: isPressed ? 0.98 : 1 }],
        borderRadius: 12,
        backgroundColor: "#fff",
        padding: 16,
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          android: {
            elevation: 6,
          },
          web: {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          },
        }),
      }}
    >
      <YStack flex={1}>
        <Image
          source={{ uri: item.image || "https://example.com/default-image.jpg" }}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 8,
          }}
        />
        <YStack paddingTop="$2" flex={1}>
          <Text fontSize={16} fontWeight="bold" marginBottom="$1">
            {item.name}
          </Text>
          <Text fontSize={12} color="#4a4a4a" marginBottom="$1" numberOfLines={2}>
            {item.description}
          </Text>
          <Text fontSize={12} color="#4a4a4a" fontWeight="bold" marginBottom="$1">
            {item.propertyType}
          </Text>
          <Text fontSize={14} color="#4a4a4a" marginBottom="$1">
            €{item.price}/month
          </Text>
          <Text fontSize={12} color="#00a699" marginBottom="$2">
            {item.availability}
          </Text>

          <XStack justifyContent="space-between" marginTop="auto">
            <XStack alignItems="center">
              <MaterialIcons name="king-bed" size={14} color="#4a4a4a" />
              <Text fontSize={10} color="#4a4a4a" marginLeft="$1">
                {item.rooms}
              </Text>
            </XStack>
            <XStack alignItems="center">
              <MaterialIcons name="bathtub" size={14} color="#4a4a4a" />
              <Text fontSize={10} color="#4a4a4a" marginLeft="$1">
                {item.bathrooms}
              </Text>
            </XStack>
            <XStack alignItems="center">
              <MaterialIcons name="location-pin" size={14} color="#4a4a4a" />
              <Text fontSize={10} color="#4a4a4a" marginLeft="$1">
                {item.distanceFromUniversity} km
              </Text>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </Pressable>
  )
}