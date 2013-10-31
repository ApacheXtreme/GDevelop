/** \file
 *  Game Develop
 *  2008-2013 Florian Rival (Florian.Rival@gmail.com)
 */

#ifndef DYNAMICLIBRARIESTOOLS_H
#define DYNAMICLIBRARIESTOOLS_H

#include <string>
#if defined(WINDOWS)
    #ifndef _WINDEF_
    class HINSTANCE__; // Forward or never
    typedef HINSTANCE__* HINSTANCE;
    #endif
    typedef HINSTANCE Handle;
#elif defined(LINUX) || defined (MAC)
    typedef void* Handle;
#else
    #warning system not supported for dynamic libraries loading
    typedef void* Handle;
#endif

namespace gd
{

/**
 * \brief Open a raw C++ dynamic library.
 *
 * On system with POSIX support, loading is made with RTLD_LAZY and RTLD_LOCAL flags.
 * If symbols of libraries need to be available globally, call SetLibraryGlobal after.
 */
Handle GD_CORE_API OpenLibrary(const char* path);

/**
 * \brief Get a raw symbol from a raw C++ dynamic library
 */
void* GD_CORE_API GetSymbol(Handle library, const char* name);

/**
 * \brief Close a raw C++ dynamic library
 * \note Libraries are reference counted, so that the library will be really freed from memory
 * when CloseLibrary will be called with the same amount of time OpenLibrary was called.
 */
void GD_CORE_API CloseLibrary(Handle library);

/**
 * \brief Get the last error occurred when loading a dynamic library
 */
std::string GD_CORE_API DynamicLibraryLastError();

#if defined(LINUX) || defined (MAC)
/**
 * \brief Set all symbols from a raw C++ dynamic library available ( RTLD_GLOBAL )
 *
 * Useless for Windows : dynamic libraries opened have their symbols available
 * globally, and when getting a symbol, the lookup is properly made.
 */
Handle GD_CORE_API SetLibraryGlobal(const char* path);
#endif

};

#endif // DYNAMICLIBRARIESTOOLS_H
