package com.nooralislam.app.data.remote.dto

import com.google.gson.annotations.SerializedName

data class OverpassResponse(
    @SerializedName("elements")
    val elements: List<OverpassElement>? = null
)

data class OverpassElement(
    @SerializedName("type")
    val type: String?,
    @SerializedName("id")
    val id: Long,
    @SerializedName("lat")
    val lat: Double?,
    @SerializedName("lon")
    val lon: Double?,
    @SerializedName("center")
    val center: OverpassCenter?,
    @SerializedName("tags")
    val tags: Map<String, String>?
)

data class OverpassCenter(
    @SerializedName("lat")
    val lat: Double,
    @SerializedName("lon")
    val lon: Double
)
