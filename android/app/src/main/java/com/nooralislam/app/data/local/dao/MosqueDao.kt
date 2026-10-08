package com.nooralislam.app.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.nooralislam.app.data.local.entity.MosqueEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MosqueDao {
    @Query("SELECT * FROM mosques ORDER BY distanceMeters ASC")
    fun getAllMosques(): Flow<List<MosqueEntity>>

    @Query("SELECT * FROM mosques ORDER BY distanceMeters ASC")
    suspend fun getMosquesList(): List<MosqueEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMosques(mosques: List<MosqueEntity>)

    @Query("DELETE FROM mosques")
    suspend fun deleteAllMosques()
}
