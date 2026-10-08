package com.nooralislam.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.nooralislam.app.data.local.dao.MosqueDao
import com.nooralislam.app.data.local.entity.MosqueEntity

@Database(entities = [MosqueEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun mosqueDao(): MosqueDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "noor_al_islam.db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
