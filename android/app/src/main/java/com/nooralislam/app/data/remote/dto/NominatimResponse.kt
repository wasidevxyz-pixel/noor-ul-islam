package com.nooralislam.app.data.remote.dto

import com.google.gson.annotations.SerializedName

data class NominatimReverseResponse(
    @SerializedName("place_id")
    val placeId: Long?,
    @SerializedName("name")
    val name: String? = null,
    @SerializedName("lat")
    val lat: String?,
    @SerializedName("lon")
    val lon: String?,
    @SerializedName("display_name")
    val displayName: String?,
    @SerializedName("address")
    val address: NominatimAddress?
)

data class NominatimAddress(
    @SerializedName("amenity")
    val amenity: String? = null,
    @SerializedName("shop")
    val shop: String? = null,
    @SerializedName("pharmacy")
    val pharmacy: String? = null,
    @SerializedName("commercial")
    val commercial: String? = null,
    @SerializedName("office")
    val office: String? = null,
    @SerializedName("building")
    val building: String? = null,
    @SerializedName("house_number")
    val houseNumber: String? = null,
    @SerializedName("road")
    val road: String? = null,
    @SerializedName("street")
    val street: String? = null,
    @SerializedName("pedestrian")
    val pedestrian: String? = null,
    @SerializedName("residential")
    val residential: String? = null,
    @SerializedName("neighbourhood")
    val neighbourhood: String? = null,
    @SerializedName("suburb")
    val suburb: String? = null,
    @SerializedName("city_district")
    val cityDistrict: String? = null,
    @SerializedName("city")
    val city: String? = null,
    @SerializedName("town")
    val town: String? = null,
    @SerializedName("state")
    val state: String? = null,
    @SerializedName("country")
    val country: String? = null
)
