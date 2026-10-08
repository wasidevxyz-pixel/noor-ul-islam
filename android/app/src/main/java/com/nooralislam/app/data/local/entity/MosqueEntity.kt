package com.nooralislam.app.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "mosques")
data class MosqueEntity(
    @PrimaryKey
    val osmId: Long,
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val distanceMeters: Double,
    val address: String,
    val cachedTimestamp: Long = System.currentTimeMillis()
)
